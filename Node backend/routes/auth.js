const express = require("express");

const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            console.log("Existing User", userDoc);
            return Promise.reject("Email already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("name").trim().not().isEmpty(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.signup
);

router.post("/login", authController.signin);

module.exports = router;
