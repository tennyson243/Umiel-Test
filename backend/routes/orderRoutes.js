import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
  isAdminOrSuperAdmin,
  isAuth,
  isSellerOrAdminOrSuperAdmin,
  mailgun,
  payOrderEmailTemplate,
} from "../util.js";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.get(
  "/",
  isAuth,
  isSellerOrAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || "";
    const sellerFilter = seller ? { seller } : {};
    const orders = await Order.find({ ...sellerFilter }).populate(
      "utilisateur",
      "nom"
    );
    res.send(orders);
  })
);

orderRouter.get(
  "/summary",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    const users = await Order.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          sales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Order.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ utilisateur: req.utilisateur._id });
    res.send(orders);
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        seller: req.body.orderItems[0].seller,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        utilisateur: req.utilisateur._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRouter.post(
  "/affiliate-transaction",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const transactionId = req.body.transactionId;
    const orderId = req.body.orderId;

    try {
      const affiliateTrans = await Order.findById(orderId);

      if (affiliateTrans) {
        affiliateTrans.transactions = transactionId;
        await affiliateTrans.save();
        res.status(201).send({
          message: "Commande modifiée avec succès.",
        });
      } else {
        res.status(404).send({
          message: "Commande non trouvée.",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour des transactions affiliées.",
        error: error.message,
      });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "utilisateur",
      "email nom"
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      try {
        mailgun()
          .messages()
          .send(
            {
              from: "Amazona <umiel@mg.umielgoma.com>",
              to: `${order.utilisateur.nom} <${order.utilisateur.email}>`,
              subject: `Nouveau Commande ${order._id}`,
              html: payOrderEmailTemplate(order),
            },
            (error, body) => {
              if (error) {
                console.log(error);
              } else {
                console.log(body);
              }
            }
          );
      } catch (err) {
        console.log(err);
      }

      res.send({ message: "Commande Payer", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Commande No Trouver" });
    }
  })
);

orderRouter.delete(
  "/:id",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.deleteOne();
      res.send({ message: "Commande Supprimer", order: deleteOrder });
    } else {
      res.status(404).send({ message: "Commande No Trouvee" });
    }
  })
);

orderRouter.put(
  "/:id/deliver",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: "Commande Livrer", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Commande No Found" });
    }
  })
);

export default orderRouter;
