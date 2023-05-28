import History from "../models/history.js";
import mongoose from "mongoose";

export const getHistorys = async (req, res) => {
  try {
    const result = await History.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const uploadHistory = async (req, res) => {
  try {
    const { date, supplier, name, productName,type, unit, quantity } = req.body;
    // if (!mongoose.Types.ObjectId.isValid(user))
    //   return res.status(404).send({ message: `Not a valid User: ${user}` });
    const history = new History({
      date,
      supplier,
      name,
      quantity,
      productName,
      type,
      unit,
    });
    const result = await history.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const updateHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, supplier, name,productName,type, unit, quantity } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid id: ${id}` });

    const result = await History.findByIdAndUpdate(
      id,
      {
        date,
        supplier,
        name,
        productName,
        quantity,
        type,
        unit,
      },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await History.findByIdAndDelete(id);
    res.json({ mesagge: "History deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
