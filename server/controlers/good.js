import Good from "../models/good.js";
import mongoose from "mongoose";

// getgood
export const getGoods = async (req, res) => {
  try {
    const result = await Good.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecentGoods = async (req, res) => {
  try {
    const result = await Good.find().sort({ updatedAt: -1 }).limit(3);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMinimum = async (req, res) => {
  try {
    const result = await Good.aggregate([
      {
        $group: {
          _id: "$stock",
          doc: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 1 },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadGood = async (req, res) => {
  try {
    const { name, stock, price, type, unit } = req.body;
    // if (!mongoose.Types.ObjectId.isValid(user))
    //   return res.status(404).send({ message: `Not a valid User: ${user}` });
    const good = new Good({
      name,
      stock,
      price,
      type,
      unit,
    });
    const result = await good.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const updateGood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, stock, price, type, unit } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid id: ${id}` });

    const result = await Good.findByIdAndUpdate(
      id,
      {
        name,
        stock,
        price,
        type,
        unit,
        updatedAt: new Date(),
      },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const deleteGood = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Good.findByIdAndDelete(id);
    res.json({ message: "Good deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
