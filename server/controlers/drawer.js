import Drawer from "../models/drawer.js";
import mongoose from "mongoose";
import moment from "moment";

export const getDrawers = async (req, res) => {
  try {
    const { month, year } = req.query;
    const currentMonth = month; //? month : new Date().getMonth();
    const currentYear = year; //? year : new Date().getFullYear();
    const startOfMonth = new Date(currentYear, parseInt(currentMonth), 1);
    const endOfMonth = new Date(currentYear, parseInt(currentMonth) + 1, 1);
    const result = await Drawer.find({
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
    const list = await Drawer.find({
      date: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      },
    });
    // TOTAL OF drawer IN A DAY
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

export const uploadDrawer = async (req, res) => {
  try {
    const { date, transactionNo, drawerNo, quantity, amount, time } = req.body;
    const drawer = new Drawer({
      date,
      time,
      transactionNo,
      drawerNo,
      quantity,
      amount,
    });
    const result = await drawer.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const updateDrawer = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, transactionNo, drawerNo, quantity, amount,time } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid id: ${id}` });

    const result = await Drawer.findByIdAndUpdate(
      id,
      {
        date,
        time,
        transactionNo,
        drawerNo,
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

export const deleteDrawer = async (req, res) => {
  try {
    const { id } = req.params;
    await Drawer.findByIdAndDelete(id);
    res.json({ mesagge: "Drawer deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
