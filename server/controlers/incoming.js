import Incoming from "../models/incoming.js";
import mongoose from "mongoose";

export const getIncomings = async (req, res) => {
  try {
    const result = await Incoming.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const uploadIncoming = async (req, res) => {
  try {
    const { date, supplier, name, productName,type, unit, quantity } = req.body;
    // if (!mongoose.Types.ObjectId.isValid(user))
    //   return res.status(404).send({ message: `Not a valid User: ${user}` });
    const incoming = new Incoming({
      date,
      supplier,
      name,
      quantity,
      productName,
      type,
      unit,
    });
    const result = await incoming.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const updateIncoming = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, supplier, name,productName,type, unit, quantity } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid id: ${id}` });

    const result = await Incoming.findByIdAndUpdate(
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

export const deleteIncoming = async (req, res) => {
  try {
    const { id } = req.params;
    await Incoming.findByIdAndDelete(id);
    res.json({ mesagge: "Incoming deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
