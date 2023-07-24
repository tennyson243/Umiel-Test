import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    cover: { type: String, required: true },
    catgeory: { type: String, required: true },
    title: { type: String, required: true },
    sousCategorie: { type: String, required: true },
    authorName: { type: String, required: true },
    authorImg: { type: String, required: true },
    time: { type: String, required: true },
    isPopulaire: { type: Boolean, default: false, required: true },
    desc: { type: String, required: true },
    ingredient: [{ type: String }],
    ustencile: [{ type: String }],
    recette: [
      {
        image: { type: String },
        desc: { type: String },
      },
    ],
    application: [
      {
        mode: { type: String },
        temps: { type: String },
      },
    ],
    precaution: [{ type: String }],
    bibliographie: { type: String },
  },
  {
    timestamps: true,
  }
);

const Hero = mongoose.model("hero", heroSchema);
export default Hero;
