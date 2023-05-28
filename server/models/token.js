import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const tokenSchema = mongoose.Schema({
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodator",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now()
  }
});

tokenSchema.methods.compareToken = async function (token) {
  const result = token === this.token
  return result
}
export default mongoose.model("Token", tokenSchema);
