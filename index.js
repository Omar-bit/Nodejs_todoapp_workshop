const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', async (req, res) => {
  res.send('server is working');
});
app.use('/user', userRouter);
app.use('/todo', todoRouter);

mongoose.connect('mongodb://127.0.0.1:27017/todo').then(() => {
  app.listen(3000, function () {
    console.log('server is running on port ' + 3000);
  });
});
