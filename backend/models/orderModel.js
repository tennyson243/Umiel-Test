import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        nom: { type: String, required: true },
        qty: { type: Number, required: true },
        prix: { type: Number, required: true },
        image: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      nom: { type: String, required: true },
      postnom: { type: String, required: true },
      pays: { type: String, required: true },
      street1: { type: String, required: true },
      street2: { type: String, required: true },
      ville: { type: String, required: true },
      province: { type: String, required: true },
      codePostal: { type: String, required: true },
      email: { type: String, required: true },
      telephone: { type: String, required: true },
      lat: Number,
      lng: Number,
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },
    transactions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: "Utilisateur" },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
