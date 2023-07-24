import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdminOrSuperAdmin, isAuth } from "../util.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
import AffiliateStat from "../models/AffiliateStat.js";
import ProductStat from "../models/ProductStat.js";
import Product from "../models/productModel.js";
import Utilisateur from "../models/userModel.js";

const generalRouter = express.Router();

generalRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const sales = await OverallStat.find();
      res.status(200).json(sales[0]);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);

generalRouter.get(
  "/dashboard",
  expressAsyncHandler(async (req, res) => {
    try {
      // hardcoded values
      const currentDate = new Date();

      // Get current month (ex: "juillet")
      const currentMonth = currentDate.toLocaleString("default", {
        month: "long",
      });

      // Get current year (ex: 2023)
      const currentYear = currentDate.getFullYear();

      // Get current day in the format "YYYY-MM-DD"
      const currentDay = currentDate.toISOString().slice(0, 10);

      /* Recent Transactions */
      const transactions = await Transaction.find()
        .limit(50)
        .sort({ createdOn: -1 });

      /* Overall Stats */
      const overallStat = await OverallStat.find({ year: currentYear });
      const {
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
      } = overallStat[0];

      const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
        return month === currentMonth;
      });
      const todayStats = overallStat[0].dailyData.find(({ date }) => {
        return date === currentDay;
      });

      res.status(200).json({
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats,
        transactions,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);

generalRouter.post(
  "/affiliate-sales",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userId = req.utilisateur._id;
    const transactionId = req.body.transactionId;

    try {
      const affiliateStat = await AffiliateStat.findOne({ userId });

      if (affiliateStat) {
        affiliateStat.affiliateSales.push(transactionId);
        await affiliateStat.save();

        res.status(201).send({
          message: "Affiliation modifiée avec succès.",
        });
      } else {
        const newAffiliateStat = new AffiliateStat({
          userId,
          affiliateSales: [transactionId],
        });

        const createdAffiliateStat = await newAffiliateStat.save();

        res.status(201).send({
          message: "Nouvelle entrée AffiliateStat créée.",
          newAffiliateStat: createdAffiliateStat,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour des ventes affiliées.",
        error: error.message,
      });
    }
  })
);

generalRouter.get(
  "/update-product-stats",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      // Obtenez toutes les transactions
      const transactions = await Transaction.find();

      // Parcourez chaque transaction
      for (const transaction of transactions) {
        const { products } = transaction;

        // Parcourez chaque produit dans la transaction
        for (const productId of products) {
          // Recherchez les statistiques de produit existantes
          const productStat = await ProductStat.findOne({ productId });

          if (productStat) {
            // Mettez à jour les statistiques du produit existant
            productStat.yearlySalesTotal += parseFloat(transaction.cost);
            productStat.yearlyTotalSoldUnits += 1;
            productStat.monthlyData[0].totalSales += parseFloat(
              transaction.cost
            );
            productStat.monthlyData[0].totalUnits += 1;
            productStat.dailyData[0].totalSales += parseFloat(transaction.cost);
            productStat.dailyData[0].totalUnits += 1;

            await productStat.save();
          } else {
            // Créez de nouvelles statistiques de produit
            const newProductStat = new ProductStat({
              productId,
              yearlySalesTotal: transaction.cost,
              yearlyTotalSoldUnits: 1,
              year: new Date().getFullYear(),
              monthlyData: [
                {
                  month: new Date().toLocaleString("default", {
                    month: "long",
                  }),
                  totalSales: transaction.cost,
                  totalUnits: 1,
                },
              ],
              dailyData: [
                {
                  date: new Date().toISOString().slice(0, 10),
                  totalSales: transaction.cost,
                  totalUnits: 1,
                },
              ],
            });
            const createdProductStat = await newProductStat.save();
          }
        }
      }

      res.status(200).json({ message: "Product stats updated successfully." });
    } catch (error) {
      res.status(500).json({
        message: "Error updating product stats.",
        error: error.message,
      });
    }
  })
);

generalRouter.get(
  "/update-overall-stats",
  isAuth,
  isAdminOrSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      // Obtenez toutes les transactions
      const transactions = await Transaction.find();

      // Variables pour stocker les statistiques globales
      let totalCustomers = await Utilisateur.countDocuments();
      let yearlySalesTotal = 0;
      let yearlyTotalSoldUnits = 0;
      const salesByCategory = new Map();
      const monthlyData = [];
      const dailyData = [];

      // Parcourez chaque transaction
      for (const transaction of transactions) {
        // Mise à jour des ventes totales et du nombre total d'unités vendues par an
        yearlySalesTotal += parseFloat(transaction.cost);
        yearlyTotalSoldUnits += 1;

        // Mise à jour des ventes par catégorie
        const { products } = transaction;
        for (const productId of products) {
          const product = await Product.findById(productId);
          if (product) {
            const { category } = product;
            if (salesByCategory.has(category)) {
              salesByCategory.set(
                category,
                salesByCategory.get(category) + parseFloat(transaction.cost)
              );
            } else {
              salesByCategory.set(category, parseFloat(transaction.cost));
            }
          }
        }

        // Mise à jour des données mensuelles
        const transactionMonth = new Date(transaction.createdAt).toLocaleString(
          "default",
          { month: "long" }
        );
        const monthData = monthlyData.find(
          (data) => data.month === transactionMonth
        );
        if (monthData) {
          monthData.totalSales += parseFloat(transaction.cost);
          monthData.totalUnits += 1;
        } else {
          monthlyData.push({
            month: transactionMonth,
            totalSales: parseFloat(transaction.cost),
            totalUnits: 1,
          });
        }

        // Mise à jour des données quotidiennes
        const transactionDate = new Date(transaction.createdAt)
          .toISOString()
          .slice(0, 10);
        const dateData = dailyData.find(
          (data) => data.date === transactionDate
        );
        if (dateData) {
          dateData.totalSales += parseFloat(transaction.cost);
          dateData.totalUnits += 1;
        } else {
          dailyData.push({
            date: transactionDate,
            totalSales: parseFloat(transaction.cost),
            totalUnits: 1,
          });
        }
      }

      // Arrondir les valeurs à deux chiffres après la virgule
      yearlySalesTotal = parseFloat(yearlySalesTotal.toFixed(2));
      monthlyData.forEach((data) => {
        data.totalSales = parseFloat(data.totalSales.toFixed(2));
      });
      dailyData.forEach((data) => {
        data.totalSales = parseFloat(data.totalSales.toFixed(2));
      });

      // Création ou mise à jour des statistiques globales
      const overallStat = await OverallStat.findOne({
        year: new Date().getFullYear(),
      });
      if (overallStat) {
        overallStat.totalCustomers = totalCustomers;
        overallStat.yearlySalesTotal = yearlySalesTotal;
        overallStat.yearlyTotalSoldUnits = yearlyTotalSoldUnits;
        overallStat.monthlyData = monthlyData;
        overallStat.dailyData = dailyData;
        overallStat.salesByCategory = Object.fromEntries(salesByCategory);
        await overallStat.save();
      } else {
        const newOverallStat = new OverallStat({
          totalCustomers,
          yearlySalesTotal,
          yearlyTotalSoldUnits,
          year: new Date().getFullYear(),
          monthlyData,
          dailyData,
          salesByCategory: Object.fromEntries(salesByCategory),
        });

        await newOverallStat.save();
      }

      res.status(200).json({ message: "Overall stats updated successfully." });
    } catch (error) {
      res.status(500).json({
        message: "Error updating overall stats.",
        error: error.message,
      });
    }
  })
);

export default generalRouter;
