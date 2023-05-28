import User from "../models/user.js";

export const patchEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Account not Found" });
    }
    user.email = email
    const result = await user.save()
    res.json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: `${err.message}` });
  }
};

export const patchContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { contact } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Account not Found" });
    }
    user.contact = contact
    const result = await user.save()
    res.json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: `${err.message}` });
  }
};
