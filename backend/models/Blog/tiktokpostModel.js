import mongoose from "mongoose";

const tiktokPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    cover: { type: String, required: true },
    link: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const TikTok = mongoose.model("Tiktokpost", tiktokPostSchema);
export default TikTok;
