import express from "express";
import expressAsyncHandler from "express-async-handler";
import Discovery from "../../models/Blog/discoveryModel.js";
import Galerie from "../../models/Blog/galerieModel.js";
import Hero from "../../models/Blog/heroModel.js";
import Lifestyle from "../../models/Blog/lifestyleModel.js";
import Populaire from "../../models/Blog/populaireModel.js";
import PopulairePost from "../../models/Blog/populairePostModel.js";
import TikTok from "../../models/Blog/tiktokpostModel.js";

const discoveryRouter = express.Router();

discoveryRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    try {
      // Compter le nombre total de documents dans le modèle Hero
      const heroCount = await Hero.countDocuments();

      // Créer ou mettre à jour le modèle Discovery pour Hero
      await Discovery.findOneAndUpdate(
        { title: "Hero" },
        { cover: "", total: heroCount },
        { upsert: true }
      );
      const galerieCount = await Galerie.countDocuments();
      await Discovery.findOneAndUpdate(
        { title: "Galerie" },
        { cover: "", total: galerieCount },
        { upsert: true }
      );
      // Compter le nombre total de documents dans le modèle Populaire
      const populaireCount = await Populaire.countDocuments();

      // Créer ou mettre à jour le modèle Discovery pour Populaire
      await Discovery.findOneAndUpdate(
        { title: "Populaire" },
        { cover: "", total: populaireCount },
        { upsert: true }
      );

      const populairePostCount = await PopulairePost.countDocuments();

      // Créer ou mettre à jour le modèle Discovery pour Populaire
      await Discovery.findOneAndUpdate(
        { title: "PopulairePost" },
        { cover: "", total: populairePostCount },
        { upsert: true }
      );
      // Ajouter d'autres modèles similaires ici
      const lifeStyleCount = await Lifestyle.countDocuments();

      // Créer ou mettre à jour le modèle Discovery pour Populaire
      await Discovery.findOneAndUpdate(
        { title: "LifeStyle" },
        { cover: "", total: lifeStyleCount },
        { upsert: true }
      );

      const tiktokCount = await TikTok.countDocuments();

      // Créer ou mettre à jour le modèle Discovery pour Populaire
      await Discovery.findOneAndUpdate(
        { title: "TikTok" },
        { cover: "", total: tiktokCount },
        { upsert: true }
      );

      res.status(200).json({
        message: "Modèles Discovery créés ou mis à jour avec succès.",
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  })
);

discoveryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const discoverys = await Discovery.find({});
    res.send(discoverys);
  })
);
export default discoveryRouter;
