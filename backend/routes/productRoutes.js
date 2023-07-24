import express from "express";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import Utilisateur from "../models/userModel.js";
import data from "../Data.js";
import {
  isAdminOrSuperAdmin,
  isAuth,
  isSellerOrAdminOrSuperAdmin,
} from "../util.js";
import ProductStat from "../models/ProductStat.js";

const productRouter = express.Router();

productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const nom = req.query.nom || "";
    const category = req.query.category || "";
    const seller = req.query.seller || "";
    const order = req.query.order || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = nom ? { nom: { $regex: nom, $options: "i" } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { prix: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Product.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate("seller", "seller.nom seller.logo")
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

productRouter.get(
  "/list",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find();
    res.send(products);
  })
);

productRouter.get(
  "/client",
  expressAsyncHandler(async (req, res) => {
    try {
      const products = await Product.find();
      const productsWithStats = await Promise.all(
        products.map(async (product) => {
          const stat = await ProductStat.find({
            productId: product._id,
          });
          return {
            ...product._doc,
            stat,
          };
        })
      );

      res.status(200).json(productsWithStats);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);

productRouter.get(
  "/recent",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}).limit(4);
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const seller = await Utilisateur.findOne({ isSeller: true });
    const influenceur = await Utilisateur.findOne({ isInfluenceur: true });
    if (seller) {
      const products = data.produit.map((product) => ({
        ...product,
        seller: seller._id,
        influenceur: influenceur._id,
      }));
      const createdProducts = await Product.insertMany(products);
      res.send({ createdProducts });
    } else {
      res
        .status(500)
        .send({ message: "No seller found. first run /api/users/seed" });
    }
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "seller.name seller.logo seller.rating seller.numReviews"
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isSellerOrAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      nom: "sample name " + Date.now(),
      seller: req.utilisateur._id,
      influenceur: req.utilisateur._id,
      image: "/Images/1.png",
      prix: 0,
      solde: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
      photoUrl: req.body.photoUrl,
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);
productRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.nom = req.body.nom;
      product.prix = req.body.prix;
      product.solde = req.body.solde;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      product.photoUrl = req.body.photoUrl;
      product.features = req.body.features;
      product.notices = req.body.notices;
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.deleteOne();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.utilisateur.nom)) {
        return res.status(400).send({
          message: "Vous avez deja publier un commentaire sur ce produit",
        });
      }
      const review = {
        name: req.utilisateur.nom,
        rating: Number(req.body.rating),
        comment: req.body.comment,
        avatar: req.utilisateur.photoURL,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// productRouter.get("/", async (req, res) => {
//   const products = await Product.find();
//   res.send(products);
// });

// const PAGE_SIZE = 6;
// productRouter.get(
//   "/search",
//   expressAsyncHandler(async (req, res) => {
//     const { query } = req;
//     const pageSize = query.pageSize || PAGE_SIZE;
//     const page = query.page || 1;
//     const brand = query.brand || "";
//     const prix = query.prix || "";
//     const categorie = query.categorie || "";
//     const rating = query.rating || "";
//     const searchQuery = query.query || "";
//     const order = req.query.order || "";

//     const queryFilter =
//       searchQuery && searchQuery !== "all"
//         ? {
//             nom: {
//               $regex: searchQuery,
//               $options: "i",
//             },
//           }
//         : {};
//     const categoriesFilter =
//       categorie && categorie !== "all" ? { categorie } : {};
//     const prixFilter =
//       prix && prix !== "all"
//         ? {
//             prix: {
//               $gte: Number(prix.split("-")[0]),
//               $lte: Number(prix.split("-")[1]),
//             },
//           }
//         : {};
//     const ratingFilter =
//       rating && rating !== "all" ? { rating: { $gte: Number(rating) } } : {};
//     const sortOrder =
//       order === "featured"
//         ? { featured: -1 }
//         : order === "lowest"
//         ? { price: 1 }
//         : order === "highest"
//         ? { price: -1 }
//         : order === "toprated"
//         ? { rating: -1 }
//         : order === "newest"
//         ? { createdAt: -1 }
//         : { _id: -1 };

//     const products = await Product.find({
//       ...queryFilter,
//       ...categoriesFilter,
//       ...prixFilter,
//       ...ratingFilter,
//     })
//       .sort(sortOrder)
//       .skip(pageSize * (page - 1))
//       .limit(pageSize);

//     const countProducts = await Product.countDocuments({
//       ...queryFilter,
//       ...categoriesFilter,
//       ...prixFilter,
//       ...ratingFilter,
//     });

//     res.send({
//       products,
//       countProducts,
//       page,
//       pages: Math.ceil(countProducts / pageSize),
//     });
//   })
// );

// productRouter.get(
//   "/categories",
//   expressAsyncHandler(async (req, res) => {
//     const categories = await Product.find().distinct("categorie");
//     res.send(categories);
//   })
// );

// productRouter.get("/slug/:slug", async (req, res) => {
//   const produit = await Product.findOne({ slug: req.params.slug });
//   if (produit) {
//     res.send(produit);
//   } else {
//     res.status(404).send({ message: "Produit non trouve" });
//   }
// });

// productRouter.get("/:id", async (req, res) => {
//   const produit = await Product.findById(req.params.id);
//   if (produit) {
//     res.send(produit);
//   } else {
//     res.status(404).send({ message: "Produit non trouve" });
//   }
// });
export default productRouter;
