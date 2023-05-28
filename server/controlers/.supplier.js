import Supplier from "../models/supplier.js";
import mongoose from "mongoose";

export const getSuppliers = async (req, res) => {
  try {
    const result = await Supplier.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const uploadSupplier = async (req, res) => {
  try {
    const { name, contact, address } = req.body;
    const supplier = new Supplier({
      name,
      contact,
      address,
    });
    const result = await supplier.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact, address } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid id: ${id}` });

    const result = await Supplier.findByIdAndUpdate(
      id,
      {
        name,
        contact,
        address,
      },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    await Supplier.findByIdAndDelete(id);
    res.json({ mesagge: "Supplier deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
