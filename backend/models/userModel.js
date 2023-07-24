import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, min: 2, max: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    motdepasse: { type: String, required: true, min: 5 },
    telephone: { type: String, required: true, min: 10, max: 15, unique: true },
    photoURL: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    isSuperAdmin: { type: Boolean, default: false, required: true },
    isInfluenceur: { type: Boolean, default: false, required: true },
    isMembreEquipe: { type: Boolean, default: false, required: true },
    transactions:{
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
    seller: {
      nom: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },
    },
    influenceur: {
      nom: String,
      photo: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },
    },
    membre: {
      cover: String,
      address: String,
      name: String,
      poste: String,
      icons: [
        {
          icon: String,
          link: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Utilisateur = mongoose.model("Utilisateur", userSchema);
export default Utilisateur;
