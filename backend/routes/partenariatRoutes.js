import express from "express";
import data from "../Data.js";
import Partenariat from "../models/partenariatModel.js";
import expressAsyncHandler from "express-async-handler";

const partenariatRouter = express.Router();

partenariatRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createPartenariat = await Partenariat.insertMany(data.partenariat);
    res.send({ createPartenariat });
  })
);

partenariatRouter.get(
  "/list",
  expressAsyncHandler(async (req, res) => {
    const partenaire = await Partenariat.find({ isMarqueVendu: true });
    res.send(partenaire);
  })
);

partenariatRouter.get(
  "/partenaire",
  expressAsyncHandler(async (req, res) => {
    const marques = await Partenariat.find({ isPartenaire: true });
    res.send(marques);
  })
);

partenariatRouter.get(
  "/trophe",
  expressAsyncHandler(async (req, res) => {
    const trophes = await Partenariat.find({ isTrophe: true });
    res.send(trophes);
  })
);

export default partenariatRouter;
