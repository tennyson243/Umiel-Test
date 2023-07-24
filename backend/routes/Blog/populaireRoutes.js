import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../../Data.js";
import Nutrition from "../../models/Blog/populaireModel.js";
import Populaire from "../../models/Blog/populaireModel.js";
import { isAdminOrSuperAdmin, isAuth } from "../../util.js";

const populaireRouter = express.Router();

populaireRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const populaires = await Nutrition.find();
    res.send(populaires);
  })
);

populaireRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdPopulaires = await Nutrition.insertMany(data.popular);
    res.send({ createdPopulaires });
  })
);

populaireRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const title = req.query.title || "";
    const catgeory = req.query.catgeory || "";
    const titleFilter = title
      ? { title: { $regex: title, $options: "i" } }
      : {};
    const categoryFilter = catgeory ? { catgeory } : {};

    const count = await Nutrition.count({
      ...titleFilter,
      ...categoryFilter,
    });
    const populaires = await Populaire.find({
      ...titleFilter,
      ...categoryFilter,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ populaires, page, pages: Math.ceil(count / pageSize) });
  })
);

populaireRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Nutrition.find().distinct("sousCategorie");
    res.send(categories);
  })
);

populaireRouter.get(
  "/modif/:id",
  expressAsyncHandler(async (req, res) => {
    const populaires = await Nutrition.findById(req.params.id);
    if (populaires) {
      res.send(populaires);
    } else {
      res.status(404).send({ message: "Article non trouver" });
    }
  })
);

populaireRouter.get(
  "/:title",
  expressAsyncHandler(async (req, res) => {
    const populaire = await Nutrition.findOne({ title: req.params.title });
    if (populaire) {
      res.send(populaire);
    } else {
      res.status(404).send({ message: "Article non trouver" });
    }
  })
);

populaireRouter.post(
  "/",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const populaire = new Nutrition({
      title: "Article Nom " + Date.now(),
      cover: "/Images/1.png",
      catgeory: "Nutrition naturelle",
      sousCategorie: "Article",
      date: Date.now(),
      desc: "Article Description",
      role: "Article Role",
      comments: "0",
      exemple: [
        {
          titre: "Article titre",
          type: "Article Type",
          expli: "Article Explication",
          bienfait: "Article Bienfait",
          mode: "Article mode de consomation",
        },
      ],
      conclusion: "Article Conclusion",
    });
    const createdPopulaire = await populaire.save();
    res.send({ message: "Article creer", populaire: createdPopulaire });
  })
);
populaireRouter.put(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const populaireId = req.params.id;
    const populaire = await Nutrition.findById(populaireId);
    if (populaire) {
      populaire.title = req.body.title;
      populaire.cover = req.body.cover;
      populaire.catgeory = req.body.catgeory;
      populaire.sousCategorie = req.body.sousCategorie;
      populaire.time = req.body.time;
      populaire.desc = req.body.desc;
      populaire.role = req.body.role;
      populaire.exemple = req.body.exemple;
      populaire.conclusion = req.body.conclusion;

      const updatedPopulaire = await populaire.save();
      res.send({ message: "Article Mise A jour", product: updatedPopulaire });
    } else {
      res.status(404).send({ message: "Article Non Trouver" });
    }
  })
);

populaireRouter.delete(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const populaire = await Nutrition.findById(req.params.id);
    if (populaire) {
      const deletePopulaire = await populaire.deleteOne();
      res.send({ message: "Hero Deleted", hero: deletePopulaire });
    } else {
      res.status(404).send({ message: "Hero Not Found" });
    }
  })
);

populaireRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const populaireId = req.params.id;
    const populaire = await Nutrition.findById(populaireId);
    if (populaire) {
      if (populaire.reviews.find((x) => x.name === req.utilisateur.nom)) {
        return res.status(400).send({
          message: "Vous avez deja publier un commentaire sur cette Article",
        });
      }
      const review = {
        name: req.utilisateur.nom,
        rating: Number(req.body.rating),
        comment: req.body.comment,
        avatar: req.utilisateur.photoURL,
      };
      populaire.reviews.push(review);
      populaire.numReviews = populaire.reviews.length;
      populaire.rating =
        populaire.reviews.reduce((a, c) => c.rating + a, 0) /
        populaire.reviews.length;
      const updatedHero = await Populaire.save();
      res.status(201).send({
        message: "Commentaire Created",
        review: updatedHero.reviews[updatedHero.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: "Article  Not Found" });
    }
  })
);
export default populaireRouter;
