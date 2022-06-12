const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
