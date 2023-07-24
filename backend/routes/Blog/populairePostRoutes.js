import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../../Data.js";
import PopulairePost from "../../models/Blog/populairePostModel.js";

const populairePostRouter = express.Router();

populairePostRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdPpost = await PopulairePost.insertMany(data.ppost);
    res.send({ createdPpost });
  })
);
export default populairePostRouter;
