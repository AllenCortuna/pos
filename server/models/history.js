import mongoose from "mongoose";

const historySchema = mongoose.Schema({
  date: { type: Date, require: true },
  supplier: { type: String, require: true },
  name: { type: String, require: true },
  quantity: { type: Number, require: true },
  type: { type: String, require: true },
  unit: { type: String, require: true },
  productName: { type: String, require: true },
  // price: { type: Number, require: true },
});

var History = mongoose.model("History", historySchema);
export default History;
