// mongodb+srv://bouassidaomar9:awn3XsSQ7qmD9ZAS@todo-cluster.6utfr.mongodb.net/?retryWrites=true&w=majority&appName=todo-cluster
const { Schema, model } = require('mongoose');

const user = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = model('User', user);
