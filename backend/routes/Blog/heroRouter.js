import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../../Data.js";
import Hero from "../../models/Blog/heroModel.js";
import HeroModifier from "../../models/Blog/HeroModfierModel.js";
import { isAdminOrSuperAdmin, isAuth } from "../../util.js";

const heroRouter = express.Router();

heroRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdHero = await Hero.insertMany(data.heroModif);
    res.send({ createdHero });
  })
);

heroRouter.get(
  "/seedModifier",
  expressAsyncHandler(async (req, res) => {
    const createdHeroModifier = await HeroModifier.insertMany(data.heroModif);
    res.send({ createdHeroModifier });
  })
);

heroRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const heros = await Hero.find();
    res.send(heros);
  })
);

heroRouter.get(
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

    const count = await Hero.count({
      ...titleFilter,
      ...categoryFilter,
    });
    const heros = await Hero.find({
      ...titleFilter,
      ...categoryFilter,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ heros, page, pages: Math.ceil(count / pageSize) });
  })
);

heroRouter.get(
  "/populaire",
  expressAsyncHandler(async (req, res) => {
    const heros = await Hero.find({ isPopulaire: true });
    res.send(heros);
  })
);

heroRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Hero.find().distinct("catgeory");
    res.send(categories);
  })
);

heroRouter.get(
  "/modif/:id",
  expressAsyncHandler(async (req, res) => {
    const heros = await Hero.findById(req.params.id);
    if (heros) {
      res.send(heros);
    } else {
      res.status(404).send({ message: "Article non trouver" });
    }
  })
);

heroRouter.get(
  "/:title",
  expressAsyncHandler(async (req, res) => {
    const hero = await Hero.findOne({ title: req.params.title });
    if (hero) {
      res.send(hero);
    } else {
      res.status(404).send({ message: "Article non trouver" });
    }
  })
);

heroRouter.post(
  "/",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const hero = new Hero({
      title: "Article Nom " + Date.now(),
      authorName: req.utilisateur.nom,
      authorImg: req.utilisateur.photoURL,
      cover: "/Images/1.png",
      catgeory: "Remède naturel",
      sousCategorie: "A base de plantes",
      time: Date.now(),
      desc: "Article description",
      ingredient: ["Article ingrediant 1"],
      ustencile: ["Article Ustencile 1"],
      recette: [{ image: "/Images/1.png", desc: "Recette Description 1" }],
      application: [
        {
          mode: "Article mode d'utilisation",
          temps: "Article temps d'utilisation",
        },
      ],
      precaution: ["Article Precaution 1"],
      bibliographie: "Article Bibliographie",
    });
    const createdHero = await hero.save();
    res.send({ message: "hero Created", hero: createdHero });
  })
);
heroRouter.put(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const heroId = req.params.id;
    const hero = await Hero.findById(heroId);
    if (hero) {
      hero.title = req.body.title;
      hero.cover = req.body.cover;
      hero.catgeory = req.body.catgeory;
      hero.sousCategorie = req.body.sousCategorie;
      hero.authorName = req.body.authorName;
      hero.authorImg = req.body.authorImg;
      hero.time = req.body.time;
      hero.desc = req.body.desc;
      hero.ingredient = req.body.ingredient;
      hero.ustencile = req.body.ustencile;
      hero.recette = req.body.recette;
      hero.application = req.body.application;
      hero.precaution = req.body.precaution;
      hero.bibliographie = req.body.bibliographie;
      const updatedHero = await hero.save();
      res.send({ message: " Hero Updated", product: updatedHero });
    } else {
      res.status(404).send({ message: "Hero Not Found" });
    }
  })
);

heroRouter.delete(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const hero = await Hero.findById(req.params.id);
    if (hero) {
      const deleteHero = await hero.deleteOne();
      res.send({ message: "Hero Deleted", hero: deleteHero });
    } else {
      res.status(404).send({ message: "Hero Not Found" });
    }
  })
);

heroRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const heroId = req.params.id;
    const hero = await Hero.findById(heroId);
    if (hero) {
      if (hero.reviews.find((x) => x.name === req.utilisateur.nom)) {
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
      hero.reviews.push(review);
      hero.numReviews = hero.reviews.length;
      hero.rating =
        hero.reviews.reduce((a, c) => c.rating + a, 0) / hero.reviews.length;
      const updatedHero = await Hero.save();
      res.status(201).send({
        message: "Commentaire Created",
        review: updatedHero.reviews[updatedHero.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default heroRouter;
