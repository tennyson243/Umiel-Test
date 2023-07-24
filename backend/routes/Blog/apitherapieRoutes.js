import express from "express";
import Apitherapie from "../../models/Blog/apitherapieModel.js";
import { isAdminOrSuperAdmin, isAuth } from "../../util.js";
import expressAsyncHandler from "express-async-handler";
import data from "../../Data.js";

const apitherapieRouter = express.Router();

apitherapieRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdApitherapie = await Apitherapie.insertMany(data.apitherapie);
    res.send({ createdApitherapie });
  })
);

apitherapieRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const apitherapies = await Apitherapie.find();
    res.send(apitherapies);
  })
);

apitherapieRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Apitherapie.find().distinct("sousCategorie");
    res.send(categories);
  })
);

apitherapieRouter.get(
  "/modif/:id",
  expressAsyncHandler(async (req, res) => {
    const apitherapie = await Apitherapie.findById(req.params.id);
    if (apitherapie) {
      res.send(apitherapie);
    } else {
      res.status(404).send({ message: "Article non trouver" });
    }
  })
);

apitherapieRouter.get(
  "/:title",
  expressAsyncHandler(async (req, res) => {
    const apitherapie = await Apitherapie.findOne({ title: req.params.title });
    if (apitherapie) {
      res.send(apitherapie);
    } else {
      res.status(404).send({ message: "Article non trouver" });
    }
  })
);

apitherapieRouter.post(
  "/",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const apitherapie = new Apitherapie({
      title: "Article Nom " + Date.now(),
      cover: "/Images/1.png",
      catgeory: "Santé naturelle pour tous les âges",
      sousCategorie: "Sous Categorie",
      date: Date.now(),
      introduction: "Introduction Article",
      sections: [
        {
          titre: "Section Titre",
          contenu: "Section Content",
          cover: "/Images/1.png",
        },
      ],
      conclusion: "Article Conclusion",
    });
    const createdApitherapie = await apitherapie.save();
    res.send({
      message: "Apitherapie Created",
      apitherapie: createdApitherapie,
    });
  })
);

apitherapieRouter.put(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const apitherapieId = req.params.id;
    const apitherapie = await Apitherapie.findById(apitherapieId);
    if (apitherapie) {
      apitherapie.title = req.body.title;
      apitherapie.cover = req.body.cover;
      apitherapie.catgeory = req.body.catgeory;
      apitherapie.date = req.body.date;
      apitherapie.sousCategorie = req.body.sousCategorie;
      apitherapie.introduction = req.body.introduction;
      apitherapie.sections = req.body.sections;
      apitherapie.conclusion = req.body.conclusion;
      const updatedApitherapie = await apitherapie.save();
      res.send({ message: "Apitherapie Updated", product: updatedApitherapie });
    } else {
      res.status(404).send({ message: "Article Not Found" });
    }
  })
);

apitherapieRouter.delete(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const apitherapie = await Apitherapie.findById(req.params.id);
    if (apitherapie) {
      const deleteApitherapie = await apitherapie.deleteOne();
      res.send({
        message: "Article Supprimer",
        apitherapie: deleteApitherapie,
      });
    } else {
      res.status(404).send({ message: "Article Not Found" });
    }
  })
);

apitherapieRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const apitherapieId = req.params.id;
    const apitherapie = await Apitherapie.findById(lifestyleId);
    if (apitherapie) {
      if (apitherapie.reviews.find((x) => x.name === req.utilisateur.nom)) {
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
      apitherapie.reviews.push(review);
      apitherapie.numReviews = lifestyle.reviews.length;
      apitherapie.rating =
        apitherapie.reviews.reduce((a, c) => c.rating + a, 0) /
        apitherapie.reviews.length;
      const updatedApitherapie = await Apitherapie.save();
      res.status(201).send({
        message: "Commentaire Created",
        review:
          updatedApitherapie.reviews[updatedApitherapie.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: "Article Not Found" });
    }
  })
);
export default apitherapieRouter;
