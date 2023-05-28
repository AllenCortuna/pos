import Outgoing from "../models/outgoing.js";
import mongoose from "mongoose";

export const getOutgoings = async (req, res) => {
  try {
    const result = await Outgoing.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const uploadOutgoing = async (req, res) => {
  try {
    const { outdate, customer, discount, subtotal, total } = req.body;
    // if (!mongoose.Types.ObjectId.isValid(user))
    //   return res.status(404).send({ message: `Not a valid User: ${user}` });
    const outgoing = new Outgoing({
      outdate,
      customer,
      discount,
      subtotal,
      total,
    });
    const result = await outgoing.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const updateOutgoing = async (req, res) => {
  try {
    const { id } = req.params;
    const { outdate, customer, discount, subtotal, total } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid id: ${id}` });

    const result = await Outgoing.findByIdAndUpdate(
      id,
      {
        outdate,
        customer,
        discount,
        subtotal,
        total,
      },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const deleteOutgoing = async (req, res) => {
  try {
    const { id } = req.params;
    await Outgoing.findByIdAndDelete(id);
    res.json({ mesagge: "Outgoing deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
