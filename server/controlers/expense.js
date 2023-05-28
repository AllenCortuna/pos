import Expense from "../models/expense.js";
import mongoose from "mongoose";
import moment from "moment";


export const getExpenses = async (req, res) => {
  try {
    const { month, year } = req.query;
    const currentMonth = month; //? month : new Date().getMonth();
    const currentYear = year; //? year : new Date().getFullYear();
    const startOfMonth = new Date(currentYear, parseInt(currentMonth), 1);
    const endOfMonth = new Date(currentYear, parseInt(currentMonth) + 1, 1);
    const result = await Expense.find({
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

export const getDailyTotal = async (req, res) => {
  try {
    const today = moment().startOf("day");
    const list = await Expense.find({
      date: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      },
    });
    // TOTAL OF expense IN A DAY
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

export const getMonthlyTotal = async (req, res) => {
  try {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear() + 1, now.getMonth() + 1, 0);
    const list = await Expense.find({
      date: { $gte: firstDay, $lte: lastDay },
    });

    // TOTAL OF expense IN A DAY
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

    Expense.aggregate(
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
    console.log(error.message);
  }
};

export const getYearlyTotal = async (req, res) => {
  try {
    const now = new Date();
    Expense.aggregate(
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

export const uploadExpense = async (req, res) => {
  try {
    const { date, quantity, amount, time } = req.body;
    const expense = new Expense({
      date,
      time,
      // transactionNo,
      // expenseNo,
      quantity,
      amount,
    });
    const result = await expense.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, quantity, amount, time } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid id: ${id}` });

    const result = await Expense.findByIdAndUpdate(
      id,
      {
        date,
        time,
        // transactionNo,
        // expenseNo,
        quantity,
        amount,
      },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.json({ mesagge: "Expense deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
