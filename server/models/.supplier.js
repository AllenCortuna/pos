import mongoose from "mongoose";

const incomingSchema = mongoose.Schema({
  name: { type: String, require: true },
  contact: { type: Number, require: true },
  address: { type: String, require: true },
});

var Supplier = mongoose.model("Supplier", incomingSchema);
export default Supplier;
