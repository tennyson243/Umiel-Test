import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema(
  {
    catgeory: { type: String, required: true },
    sousCategorie: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    comments: { type: String, required: true },
    cover: { type: String, required: true },
    desc: { type: String, required: true },
    role: { type: String, required: true },
    exemple: [
      {
        titre: { type: String },
        type: { type: String },
        expli: { type: String },
        bienfait: { type: String },
        mode: { type: String },
      },
    ],
    conclusion: { type: String },
    isPopulaire: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const Nutrition = mongoose.model("Nutrition", nutritionSchema);
export default Nutrition;
