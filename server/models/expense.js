import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  date: { type: Date, require: true },
  time: { type: String, require: true },
  quantity: { type: Number, require: true },
  amount: { type: Number, require: true },
  // expenseNo: { type: String, require: true },
  // transactionNo: { type: String, require: true },
});

var Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
