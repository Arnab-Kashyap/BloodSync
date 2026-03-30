const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, phone, bloodGroup, state, city } = req.body;

    if (!name || !email || !password || !phone || !bloodGroup || !state || !city) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      bloodGroup,
      state,
      city
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
  _id: user._id,
  name: user.name,
  email: user.email,
  bloodGroup: user.bloodGroup,
  state: user.state,
  city: user.city,
  phone: user.phone,
  isAvailable: user.isAvailable,
  token: generateToken(user._id),
});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  bloodGroup: user.bloodGroup,
  state: user.state,
  city: user.city,
  phone: user.phone,
  isAvailable: user.isAvailable,
  token: generateToken(user._id),
});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};