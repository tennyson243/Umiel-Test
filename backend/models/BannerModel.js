import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    cover: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    desc: { type: String, required: true },
    bouton: [{ title: { type: String }, lien: { type: String } }],
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
