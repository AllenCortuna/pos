import mongoose from "mongoose";

const goodSchema = mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  name: { type: String, require: true },
  type: { type: String, require: true },
  stock: { type: Number, require: true },
  unit: { type: String, require: true },
  price: { type: Number, require: true },
  date: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

var Good = mongoose.model("Good", goodSchema);
export default Good;
