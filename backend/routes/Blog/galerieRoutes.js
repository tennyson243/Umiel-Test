import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../../Data.js";
import Galerie from "../../models/Blog/galerieModel.js";
import { isAdminOrSuperAdmin, isAuth } from "../../util.js";

const galerieRouter = express.Router();

galerieRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdGalerie = await Galerie.insertMany(data.gallery);
    res.send({ createdGalerie });
  })
);

galerieRouter.get(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const galerie = await Galerie.findById(req.params.id);
    if (galerie) {
      res.send(galerie);
    } else {
      res.status(404).send({ message: "Photo Not Trouver" });
    }
  })
);

galerieRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const galeries = await Galerie.find();
    res.send(galeries);
  })
);

galerieRouter.post(
  "/",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const galerie = new Galerie({
      cover: "/Images/1.png",
      title: "Titre de la Photo",
      author: "Nom de l'auteur de la photo",
    });
    const createdGalerie = await galerie.save();
    res.send({ message: "galerie Created", galerie: createdGalerie });
  })
);

galerieRouter.put(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const galerieId = req.params.id;
    const galerie = await Galerie.findById(galerieId);
    if (galerie) {
      galerie.cover = req.body.cover;
      galerie.title = req.body.title;
      galerie.author = req.body.author;
      const updatedGalerie = await galerie.save();
      res.send({ message: " Galerie mise a jours", galerie: updatedGalerie });
    } else {
      res.status(404).send({ message: "Image non trouver" });
    }
  })
);

galerieRouter.delete(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const galerie = await Galerie.findById(req.params.id);
    if (galerie) {
      const deleteGalerie = await galerie.deleteOne();
      res.send({ message: "Image Supprimer", galerie: deleteGalerie });
    } else {
      res.status(404).send({ message: "Image non Trouver" });
    }
  })
);

export default galerieRouter;
