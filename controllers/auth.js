import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword, email });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "User does not exist." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(400).json({ message: "User Does not Exist" });
    }
    const token = jwt.sign(
      { id: user.id },
      "Y0u-Kn0w-517-H4pp3n5-50m371m35-3v3n-7h0u9h-W3-W15h-1t-D1d-N07-6u7-W3-4r3-H3r3-70-H3lp-H0w3v3r-W3-C4n"
    );
    res
      .status(200)
      .json({ token, user: { username: user.username, id: user.id } });
  } catch (err) {
    res.json({ error: err.message });
  }
};
