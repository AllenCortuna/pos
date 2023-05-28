import mongoose from "mongoose";

const saleSchema = mongoose.Schema({
  date: { type: Date, require: true },
  time: { type: String, require: true },
  quantity: { type: Number, require: true },
  amount: { type: Number, require: true },
  saleNo: { type: String, require: true },
  transactionNo: { type: String, require: true },
});

var Sale = mongoose.model("Sale", saleSchema);
export default Sale;
