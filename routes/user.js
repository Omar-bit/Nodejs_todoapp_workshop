const express = require('express');
const userRouter = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.post('/signup', async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  //   const {email,name,password} =req.body
  if (password.length < 8) {
    return res.json({
      ok: false,
      message: 'password must contain 8 characters at least ',
    });
  }
  if (name.length < 0) {
    return res.json({
      ok: false,
      message: 'name is required',
    });
  }
  if (email.length < 0) {
    return res.json({
      ok: false,
      message: 'email is required ',
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    password: hashedPassword,
    email,
  });
  await user.save();
  res.json({ success: true, message: 'user created successfully' });
});
userRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: 'email is wrong',
        ok: false,
      });
    }
    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.json({
        message: 'invalid password',
        ok: false,
      });
    }
    const token = jwt.sign({ user_id: user._id, name: user.name }, 'SECRET');
    return res.json({
      message: 'user signed in successfully',
      ok: true,
      data: { accessToken: token },
    });
  } catch (err) {
    return res.json({
      message: 'user signs in failed',
      ok: false,
    });
  }
});
module.exports = userRouter;
