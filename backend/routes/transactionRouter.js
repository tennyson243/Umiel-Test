import express from "express";
import expressAsyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.js";
import data from "../Data.js";
import OverallStat from "../models/OverallStat.js";
import { isAuth } from "../util.js";

const transactionsRouter = express.Router();

transactionsRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createTransaction = await Transaction.insertMany(
      data.dataTransaction
    );
    res.send({ createTransaction });
  })
);

transactionsRouter.get(
  "/client",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 20;
    const page = Number(req.query.pageNumber) || 1;
    const sort = req.query.sort || null;
    const search = req.query.search || "";

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const nameRegex = new RegExp(search, "i");
    const searchFilter = {
      $or: [{ cost: { $regex: nameRegex } }, { userId: { $regex: nameRegex } }],
    };

    try {
      const count = await Transaction.countDocuments(searchFilter);

      const transaction = await Transaction.find(searchFilter)
        .sort(sortFormatted)
        .skip(pageSize * (page - 1))
        .limit(pageSize);

      res.send({ transaction, total: count });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);

transactionsRouter.get(
  "/general/dashboard",
  expressAsyncHandler(async (req, res) => {
    try {
      // hardcoded values
      const currentMonth = "November";
      const currentYear = 2021;
      const currentDay = "2021-11-15";

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

transactionsRouter.get(
  "/sales/sales",
  expressAsyncHandler(async (req, res) => {
    try {
      const overallStats = await OverallStat.find();
      res.status(200).json(overallStats[0]);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);

transactionsRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.products.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const transaction = new Transaction({
        products: req.body.products,
        cost: req.body.totalPrice,
        userId: req.utilisateur._id,
      });
      const createdTransaction = await transaction.save();
      res.status(201).send({
        message: "New Order Created",
        transaction: createdTransaction,
      });
    }
  })
);

export default transactionsRouter;
