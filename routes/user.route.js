const express = require("express");
const { UserModel } = require("../model/user.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
    } else {
      try {
        const user = new UserModel({ email, password: hash });

        await user.save();
        res.send("registered successfully");
      } catch (err) {
        console.log(err);
        console.log("cannot register");
      }
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    console.log(user);
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          var token = jwt.sign({ hello: "hello" }, process.env.key, {
            algorithm: "HS512",
          });
          res.send({ msg: "Login Successful", token });
        } else {
          res.send("wrong password");
        }
      });
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
    console.log("cannot login");
  }
});

module.exports = { userRouter };
