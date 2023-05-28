import Sale from "../models/sale.js";
import mongoose from "mongoose";
import moment from "moment";


export const getSales = async (req, res) => {
  try {
    const result = await Sale.find({
    }).sort({date: -1}).limit(50);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getDailyTotal = async (req, res) => {
  try {
    const today = moment().startOf("day");
    const list = await Sale.find({
      date: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      },
    });
    // TOTAL OF sale IN A DAY
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

export const uploadSale = async (req, res) => {
  try {
    const { date, quantity, amount,transactionNo,saleNo, time } = req.body;
    const sale = new Sale({
      date,
      time,
      transactionNo,
      saleNo,
      quantity,
      amount,
    });
    const result = await sale.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, quantity, amount,transactionNo,saleNo, time } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid id: ${id}` });

    const result = await Sale.findByIdAndUpdate(
      id,
      {
        date,
        time,
        transactionNo,
        saleNo,
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

export const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    await Sale.findByIdAndDelete(id);
    res.json({ mesagge: "Sale deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
