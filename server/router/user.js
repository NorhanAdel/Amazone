const express = require("express");
const router = new express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { name, email, number, password, cpassword } = req.body;

  if (!name || !email || !number || !password || !cpassword) {
    return res.status(422).json({ message: "Please fill all fields." });
  }

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(422).json({ message: "User already exists." });
    }

    if (password !== cpassword) {
      return res.status(422).json({ message: "Passwords do not match." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      number,
      password: hashedPassword,
      cpassword: hashedPassword,
    });

    const storedData = await newUser.save();
    const token = await newUser.generateAuthToken(); // Generate token
    res.status(201).json({ user: storedData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Please fill all fields." });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    const token = await user.generateAuthToken();
    res.cookie("Amzoneweb", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.status(200).json({ message: "Login successful!", user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

module.exports = router;
