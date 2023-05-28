import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema({
  date: { type: Date, require: true },
  time: { type: String, require: true },
  goodID: { type: mongoose.Schema.Types.ObjectId, ref: "Good" },
  transactionNo: { type: String, require: true },
  invoiceNo: { type: String, require: true },
  quantity: { type: Number, require: true },
  birNo: { type: String, require: true },
  amount: { type: Number, require: true },
});

var Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
