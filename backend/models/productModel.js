import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    avatar: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    solde: { type: Number, required: true },
    prix: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    notices: [{ type: String }],
    category: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: "Utilisateur" },
    influenceur: { type: mongoose.Schema.Types.ObjectID, ref: "Utilisateur" },
    brand: { type: String, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
    photoUrl: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
