import express from "express";
import Utilisateur from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import {
  generateToken,
  isAdmin,
  isAdminOrSuperAdmin,
  isAuth,
} from "../util.js";
import data from "../Data.js";
import getCountryIso3 from "country-iso-2-to-3";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

const userRouter = express.Router();

userRouter.get(
  "/top-sellers",
  expressAsyncHandler(async (req, res) => {
    const topSellers = await Utilisateur.find({ isSeller: true })
      .sort({ "seller.rating": -1 })
      .limit(3);
    res.send(topSellers);
  })
);

userRouter.get(
  "/equipe",
  expressAsyncHandler(async (req, res) => {
    const equipe = await Utilisateur.find({ isMembreEquipe: true });
    res.send(equipe);
  })
);

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await Utilisateur.insertMany(data.utilisateur);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const utilisateur = await Utilisateur.findOne({ email: req.body.email });
    if (utilisateur) {
      if (bcrypt.compareSync(req.body.motdepasse, utilisateur.motdepasse)) {
        res.send({
          _id: utilisateur._id,
          nom: utilisateur.nom,
          email: utilisateur.email,
          photoURL: utilisateur.photoURL,
          isAdmin: utilisateur.isAdmin,
          isSeller: utilisateur.isSeller,
          isBlogeur: utilisateur.isBlogeur,
          isSuperAdmin: utilisateur.isSuperAdmin,
          isInfluenceur: utilisateur.isInfluenceur,
          token: generateToken(utilisateur),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const utilisateur = new Utilisateur({
      nom: req.body.nom,
      email: req.body.email,
      motdepasse: bcrypt.hashSync(req.body.motdepasse, 8),
      telephone: req.body.telephone,
    });
    const createdUser = await utilisateur.save();
    res.send({
      _id: createdUser._id,
      nom: createdUser.nom,
      email: createdUser.email,
      telephone: createdUser.telephone,
      photoURL: createdUser.photoURL,
      isAdmin: createdUser.isAdmin,
      isSuperAdmin: createdUser.isSuperAdmin,
      isSeller: utilisateur.isSeller,
      isBlogeur: utilisateur.isBlogeur,
      isInfluenceur: utilisateur.isInfluenceur,
      isMembreEquipe: utilisateur.isMembreEquipe,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (utilisateur) {
      res.send(utilisateur);
    } else {
      res.status(404).send({ message: "Utilisateur non trouver" });
    }
  })
);

userRouter.get(
  "/performance/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const id = await Utilisateur.findById(req.params.id);
      const userWithStats = await Utilisateur.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "affiliatestats",
            localField: "_id",
            foreignField: "userId",
            as: "affiliateStats",
          },
        },
        { $unwind: "$affiliateStats" },
      ]);

      const saleTransactions = await Promise.all(
        userWithStats[0].affiliateStats.affiliateSales.map((id) => {
          return Transaction.findById(id);
        })
      );
      const filteredSaleTransactions = saleTransactions.filter(
        (transaction) => transaction !== null
      );

      res.status(200).json({
        utilisateur: userWithStats[0],
        sales: filteredSaleTransactions,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);

userRouter.get(
  "/moderateurs/admin",
  expressAsyncHandler(async (req, res) => {
    const admis = await Utilisateur.find({
      isAdmin: true,
    }).select("-motdepasse");
    if (admis) {
      res.send(admis);
    } else {
      res.status(404).send({ message: "Utilisateur non trouver" });
    }
  })
);

userRouter.get(
  "/geography/geo",
  expressAsyncHandler(async (req, res) => {
    try {
      const users = await Utilisateur.find();
      const mappedLocations = users.reduce((acc, { country }) => {
        const countryISO3 = getCountryIso3(country);
        if (!acc[countryISO3]) {
          acc[countryISO3] = 0;
        }
        acc[countryISO3]++;
        return acc;
      }, {});

      const formattedLocations = Object.entries(mappedLocations).map(
        ([country, count]) => {
          return { id: country, value: count };
        }
      );

      res.status(200).json(formattedLocations);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const utilisateur = await Utilisateur.findById(req.utilisateur._id);
    if (utilisateur) {
      utilisateur.nom = req.body.nom || utilisateur.nom;
      utilisateur.email = req.body.email || utilisateur.email;
      utilisateur.telephone = req.body.telephone || utilisateur.telephone;
      utilisateur.photoURL = req.body.photoURL || utilisateur.photoURL;
      if (utilisateur.isSeller) {
        utilisateur.seller.nom = req.body.sellerNom || utilisateur.seller.nom;
        utilisateur.seller.logo =
          req.body.sellerLogo || utilisateur.seller.logo;
        utilisateur.seller.description =
          req.body.sellerDescription || utilisateur.seller.description;
      }
      if (utilisateur.isInfluenceur) {
        utilisateur.influenceur.nom =
          req.body.influenceurNom || utilisateur.influenceur.nom;
        utilisateur.influenceur.photo =
          req.body.influenceurLogo || utilisateur.influenceur.photo;
        utilisateur.influenceur.description =
          req.body.influenceurDescription ||
          utilisateur.influenceur.description;
      }
      if (utilisateur.isMembreEquipe) {
        utilisateur.membre.name = req.body.membreNom || utilisateur.membre.name;
        utilisateur.membre.cover =
          req.body.membreCover || utilisateur.membre.cover;
        utilisateur.membre.address =
          req.body.membreAdress || utilisateur.membre.address;
        utilisateur.membre.poste =
          req.body.membrePoste || utilisateur.membre.poste;
        utilisateur.membre.icons =
          req.body.membreIcons || utilisateur.membre.icons;
      }
      if (req.body.password) {
        utilisateur.motdepasse = bcrypt.hashSync(req.body.motdepasse, 8);
      }
      const updatedUser = await utilisateur.save();
      res.send({
        _id: updatedUser._id,
        nom: updatedUser.nom,
        email: updatedUser.email,
        telephone: updatedUser.telephone,
        photoURL: updatedUser.photoURL,
        isAdmin: updatedUser.isAdmin,
        isSuperAdmin: updatedUser.isSuperAdmin,
        isSeller: utilisateur.isSeller,
        isInfluenceur: utilisateur.isInfluenceur,
        isMembreEquipe: utilisateur.isMembreEquipe,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await Utilisateur.find({});
    res.send(users);
  })
);

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (utilisateur) {
      if (utilisateur.email === "tennysonnickson@gmail.com") {
        res
          .status(400)
          .send({ message: "Vous n'est pouvez pas Supprimer un SuperAdmin" });
        return;
      }
      const deleteUser = await utilisateur.deleteOne();
      res.send({ message: "Utilisateur Supprimer", utilisateur: deleteUser });
    } else {
      res.status(404).send({ message: "Utilisateur non Trouver" });
    }
  })
);

userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (utilisateur) {
      utilisateur.nom = req.body.nom || utilisateur.nom;
      utilisateur.email = req.body.email || utilisateur.email;
      utilisateur.telephone = req.body.telephone || utilisateur.telephone;
      utilisateur.photoURL = req.body.photoURL || utilisateur.photoURL;
      utilisateur.isSeller = Boolean(req.body.isSeller);
      utilisateur.isInfluenceur = Boolean(req.body.isInfluenceur);
      utilisateur.isAdmin = Boolean(req.body.isAdmin);
      utilisateur.isSuperAdmin = Boolean(req.body.isSuperAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await utilisateur.save();
      res.send({ message: "User Updated", utilisateur: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

export default userRouter;
