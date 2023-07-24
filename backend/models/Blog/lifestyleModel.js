import mongoose from "mongoose";

const lifestyleSchema = new mongoose.Schema(
  {
    catgeory: { type: String, required: true },
    sousCategorie: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    cover: { type: String, required: true },
    introduction: { type: String, required: true },
    sections: [
      {
        titre: String,
        contenu: String,
      },
    ],
    conclusion: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Lifestyle = mongoose.model("Lifestyle", lifestyleSchema);
export default Lifestyle;
