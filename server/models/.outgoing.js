import mongoose from "mongoose";

const outgoingSchema = mongoose.Schema({
  outDate: { type: Date, require: true },
  customer: { type: String, require: true },
  discount: { type: Number, require: true },
  subtotal: { type: Number, require: true },
  total: { type: Number, require: true },
});

var Outgoing = mongoose.model("Outgoing", outgoingSchema);
export default Outgoing;
