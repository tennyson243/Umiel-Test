import mongoose from "mongoose";

const populairePostSchema = new mongoose.Schema(
  {
    catgeory: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    cover: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PopulairePost = mongoose.model("PopulairePost", populairePostSchema);
export default PopulairePost;
