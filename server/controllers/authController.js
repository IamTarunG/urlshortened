

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { generateToken } = require('../config/config');

const signUpUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!email || !password || !name) {
      res.status(400).json({ message: 'Please fill in all fields' });
    }
    if (userExist) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword, canShortenUrls: true });
      if (user) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
        });
      }
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        canShortenUrls : user.canShortenUrls
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = {
  signUpUser,
  loginUser
};
