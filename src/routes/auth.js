import express from "express";
import { register, login } from "../controllers/auth.js";
import { body } from "express-validator";
import User from "../models/User.js";

const authRouter = express.Router();

// a route to register a new user
authRouter.post(
  "/register",
  [
    // Validate email
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .custom(async (value) => {
        // Check if email already exists in the database
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          return Promise.reject("Email already exists");
        }
      }),

    // Validate username
    body("username").not().isEmpty().withMessage("Username cannot be empty"),

    // Validate password
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  register
);
// A router for user to log in
authRouter.post("/login", login);

export default authRouter;
