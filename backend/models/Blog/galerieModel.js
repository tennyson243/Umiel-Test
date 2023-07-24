import mongoose from "mongoose";

const GalerieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    cover: { type: String, required: true },
    author: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Galerie = mongoose.model("Galerie", GalerieSchema);
export default Galerie;
