import mongoose from "mongoose";

const drawerSchema = mongoose.Schema({
  date: { type: Date, require: true },
  time: { type: String, require: true },
  transactionNo: { type: String, require: true },
  drawerNo: { type: String, require: true },
  quantity: { type: Number, require: true },
  amount: { type: Number, require: true },
});

var Drawer = mongoose.model("Drawer", drawerSchema);
export default Drawer;
