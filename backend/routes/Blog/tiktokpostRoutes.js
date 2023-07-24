import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../../Data.js";
import TikTok from "../../models/Blog/tiktokpostModel.js";
import { isAdminOrSuperAdmin, isAuth } from "../../util.js";

const tiktokRouter = express.Router();

tiktokRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdHero = await TikTok.insertMany(data.tpost);
    res.send({ createdHero });
  })
);

tiktokRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const createdTikTok = await TikTok.find();
    res.send(createdTikTok);
  })
);

tiktokRouter.get(
  "/modif/:id",
  expressAsyncHandler(async (req, res) => {
    const tiktok = await TikTok.findById(req.params.id);
    if (tiktok) {
      res.send(tiktok);
    } else {
      res.status(404).send({ message: "TikTok non trouver" });
    }
  })
);

tiktokRouter.get(
  "/:title",
  expressAsyncHandler(async (req, res) => {
    const tiktok = await TikTok.findOne({ title: req.params.title });
    if (tiktok) {
      res.send(tiktok);
    } else {
      res.status(404).send({ message: "TikTok non trouver" });
    }
  })
);

tiktokRouter.post(
  "/",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const tiktok = new TikTok({
      title: "TikTok Nom " + Date.now(),
      cover: "/Images/1.png",
      link: "https://tiktok.com",
    });
    const createdTikTok = await tiktok.save();
    res.send({ message: "TikTok Created", tiktok: createdTikTok });
  })
);

tiktokRouter.put(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const tiktokId = req.params.id;
    const tiktok = await TikTok.findById(tiktokId);
    if (tiktok) {
      tiktok.title = req.body.title;
      tiktok.cover = req.body.cover;
      tiktok.link = req.body.link;
      const updatedTikTok = await tiktok.save();
      res.send({ message: " TikTok mise a jour", tiktok: updatedTikTok });
    } else {
      res.status(404).send({ message: "TikTok No Trouver" });
    }
  })
);

tiktokRouter.delete(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const tiktok = await TikTok.findById(req.params.id);
    if (tiktok) {
      const deleteTiktok = await tiktok.deleteOne();
      res.send({
        message: "TikTok Supprimer avec success ",
        tiktok: deleteTiktok,
      });
    } else {
      res.status(404).send({ message: "TikTok No  trouver" });
    }
  })
);

export default tiktokRouter;
