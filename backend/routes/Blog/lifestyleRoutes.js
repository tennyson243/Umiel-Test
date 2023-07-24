import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../../Data.js";
import Lifestyle from "../../models/Blog/lifestyleModel.js";
import { isAdminOrSuperAdmin, isAuth } from "../../util.js";

const lifestyleRouter = express.Router();

lifestyleRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdLifestyle = await Lifestyle.insertMany(data.lifestyle);
    res.send({ createdLifestyle });
  })
);

lifestyleRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const lifestyles = await Lifestyle.find();
    res.send(lifestyles);
  })
);

lifestyleRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Lifestyle.find().distinct("category");
    res.send(categories);
  })
);

lifestyleRouter.get(
  "/modif/:id",
  expressAsyncHandler(async (req, res) => {
    const lifestyle = await Lifestyle.findById(req.params.id);
    if (lifestyle) {
      res.send(lifestyle);
    } else {
      res.status(404).send({ message: "Article non trouver" });
    }
  })
);

lifestyleRouter.get(
  "/:title",
  expressAsyncHandler(async (req, res) => {
    const lifestyle = await Lifestyle.findOne({ title: req.params.title });
    if (lifestyle) {
      res.send(lifestyle);
    } else {
      res.status(404).send({ message: "Article non trouver" });
    }
  })
);

lifestyleRouter.post(
  "/",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const lifestyle = new Lifestyle({
      title: "Article Nom " + Date.now(),
      cover: "/Images/1.png",
      catgeory: "Santé naturelle pour tous les âges",
      sousCategorie: "Sous Categorie",
      date: Date.now(),
      introduction: "Introduction Article",
      sections: [{ titre: "Section Titre", contenu: "Section Content" }],
      conclusion: "Article Conclusion",
    });
    const createdLifestyle = await lifestyle.save();
    res.send({ message: "lifestyle Created", lifestyle: createdLifestyle });
  })
);
lifestyleRouter.put(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const lifestyleId = req.params.id;
    const lifestyle = await Lifestyle.findById(lifestyleId);
    if (lifestyle) {
      lifestyle.title = req.body.title;
      lifestyle.cover = req.body.cover;
      lifestyle.catgeory = req.body.catgeory;
      lifestyle.date = req.body.date;
      lifestyle.sousCategorie = req.body.sousCategorie;
      lifestyle.introduction = req.body.introduction;
      lifestyle.sections = req.body.sections;
      lifestyle.conclusion = req.body.conclusion;
      const updatedLifestyle = await lifestyle.save();
      res.send({ message: " Lifestyle Updated", product: updatedLifestyle });
    } else {
      res.status(404).send({ message: "Article Not Found" });
    }
  })
);

lifestyleRouter.delete(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const lifestyle = await Lifestyle.findById(req.params.id);
    if (lifestyle) {
      const deleteLifestyle = await lifestyle.deleteOne();
      res.send({ message: "Article Supprimer", lifestyle: deleteLifestyle });
    } else {
      res.status(404).send({ message: "Article Not Found" });
    }
  })
);

lifestyleRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const lifestyleId = req.params.id;
    const lifestyle = await Lifestyle.findById(lifestyleId);
    if (lifestyle) {
      if (lifestyle.reviews.find((x) => x.name === req.utilisateur.nom)) {
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
      lifestyle.reviews.push(review);
      lifestyle.numReviews = lifestyle.reviews.length;
      lifestyle.rating =
        lifestyle.reviews.reduce((a, c) => c.rating + a, 0) /
        lifestyle.reviews.length;
      const updatedLifestyle = await Lifestyle.save();
      res.status(201).send({
        message: "Commentaire Created",
        review: updatedLifestyle.reviews[updatedLifestyle.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);
export default lifestyleRouter;
