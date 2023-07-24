import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../Data.js";
import Banner from "../models/BannerModel.js";
import { isAdminOrSuperAdmin, isAuth } from "../util.js";

const bannerRouter = express.Router();

bannerRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdBanner = await Banner.insertMany(data.Banner);
    res.send({ createdBanner });
  })
);

bannerRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const banners = await Banner.find();
    res.send(banners);
  })
);

bannerRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id);
    if (banner) {
      res.send(banner);
    } else {
      res.status(404).send({ message: "Banier non trouver" });
    }
  })
);

bannerRouter.post(
  "/",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const banner = new Banner({
      title: "Banier Nom " + Date.now(),
      subtitle: "Banier subtitle " + Date.now(),
      cover: "/Images/1.png",
      desc: "Banner description",
      bouton: [
        {
          title: "Bouton titre",
          lien: "/api/banierLien",
        },
      ],
    });
    const createdBanner = await banner.save();
    res.send({ message: "banner Created", banner: createdBanner });
  })
);
bannerRouter.put(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const bannerId = req.params.id;
    const banner = await Banner.findById(bannerId);
    if (banner) {
      banner.title = req.body.title;
      banner.subtitle = req.body.subtitle;
      banner.cover = req.body.cover;
      banner.desc = req.body.desc;
      banner.bouton = req.body.bouton;

      const updatedBanner = await banner.save();
      res.send({ message: "Baniere Modifier", banner: updatedBanner });
    } else {
      res.status(404).send({ message: "Baniere Not Found" });
    }
  })
);

bannerRouter.delete(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id);
    if (banner) {
      const deleteBanner = await banner.deleteOne();
      res.send({ message: "Baniere Supprimer", banner: deleteBanner });
    } else {
      res.status(404).send({ message: "Baniere Not Found" });
    }
  })
);

export default bannerRouter;
