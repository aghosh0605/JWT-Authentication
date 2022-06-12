const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

//Register
router.post("/", async (req, res) => {
  try {
    //Get user Input from req body
    const { first_name, last_name, email, password } = req.body;
    //Validate User Input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is needed");
    }
    //check if user exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.status(400).json("User ALready Exists");
    }
    //Encrypt to store in database
    const encPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encPassword,
    });
    //Create Token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );
    // save user token
    user.token = token;
    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
