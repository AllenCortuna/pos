import Invoice from "../models/invoice.js";
import Good from "../models/good.js";
import mongoose from "mongoose";
import moment from "moment";
import { nanoid } from "nanoid";

export const getInvoices = async (req, res) => {
  try {
    const { month, year } = req.query;
    const currentMonth = month; //? month : new Date().getMonth();
    const currentYear = year; //? year : new Date().getFullYear();
    const startOfMonth = new Date(currentYear, parseInt(currentMonth), 1);
    const endOfMonth = new Date(currentYear, parseInt(currentMonth) + 1, 1);
    const result = await Invoice.find({
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getYearly = async (req, res) => {
  try {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const yearStart = new Date(currentYear, 0, 1);
    const yearEnd = new Date(currentYear, 11, 31);
    const result = await Invoice.find({
      date: {
        $gte: yearStart,
        $lte: yearEnd,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getMonthlyTotal = async (req, res) => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0);

    Invoice.aggregate(
      [
        {
          $match: {
            date: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result[0]?.totalAmount);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getDailyTotal = async (req, res) => {
  try {
    const today = moment().startOf("day");
    const list = await Invoice.find({
      date: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      },
    });
    // TOTAL OF INVOICE IN A DAY
    const total = list.map((a) => a.amount);
    const result = total.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getQuarterlyTotal = async (req, res) => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth();
    let currentYear = now.getFullYear();

    let startDate, endDate;

    if (currentMonth < 3) {
      // first quarter
      startDate = new Date(currentYear, 0, 1);
      endDate = new Date(currentYear, 2, 31);
    } else if (currentMonth < 6) {
      // second quarter
      startDate = new Date(currentYear, 3, 1);
      endDate = new Date(currentYear, 5, 30);
    } else if (currentMonth < 9) {
      // third quarter
      startDate = new Date(currentYear, 6, 1);
      endDate = new Date(currentYear, 8, 30);
    } else {
      // fourth quarter
      startDate = new Date(currentYear, 9, 1);
      endDate = new Date(currentYear, 11, 31);
    }

    Invoice.aggregate(
      [
        {
          $match: {
            date: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ],
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          res.json(result[0]?.totalAmount);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getYearlyTotal = async (req, res) => {
  try {
    const now = new Date();
    Invoice.aggregate(
      [
        {
          $match: {
            date: {
              $gte: new Date(now.getFullYear(), 0, 1),
              $lt: new Date(now.getFullYear(), 12, 0),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ],
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          res.json(result[0]?.totalAmount);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const uploadInvoice = async (req, res) => {
  try {
    const { quantity, time, goodID, birNo } = req.body;
    const now = new Date();
    // Update Goods stock
    const good = await Good.findById(goodID);
    await Good.findByIdAndUpdate(
      goodID,
      { stock: good?.stock - quantity },
      { new: true }
    );
    const invoice = new Invoice({
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      time,
      goodID,
      birNo,
      invoiceNo: nanoid(),
      quantity,
      amount: good.price * quantity,
    });
    const result = await invoice.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { goodID, quantity, amount, time, birNo } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid id: ${id}` });

    const result = await Invoice.findByIdAndUpdate(
      id,
      {
        time,
        quantity,
        amount,
        goodID,
        birNo,
      },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    await Invoice.findByIdAndDelete(id);
    res.json({ mesagge: "Invoice deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
