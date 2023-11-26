import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { validationResult } from "express-validator";

// User registration endpoint
export const register = async (req, res) => {
  try {
    // Extract username, password, and email from the request body
    const { username, password, email } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation errors exist, respond with a 400 status and the array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Generate a salt and hash the password using bcrypt for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User instance with the hashed password and other details
    const user = new User({ username, password: hashedPassword, email });

    // Save the user to the database
    const savedUser = await user.save();

    // Respond with the saved user details
    res.json(savedUser);
  } catch (err) {
    // Handle errors and respond with an error message
    res.json({ error: err.message });
  }
};

// User login endpoint
export const login = async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find the user in the database based on the provided username
    const user = await User.findOne({ where: { username } });

    // Check if the user exists
    if (!user) {
      // If the user does not exist, respond with a 400 status and a message
      return res.status(400).json({ message: "User does not exist." });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, respond with a 400 status and a message
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ id: user.id }, "Your-Secret-Key-Here");

    // Respond with the generated token and user details (username and ID)
    res
      .status(200)
      .json({ token, user: { username: user.username, id: user.id } });
  } catch (err) {
    // Handle errors and respond with an error message
    res.json({ error: err.message });
  }
};
