const { Schema, model } = require('mongoose');
const todo = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  done: { type: Boolean, required: false, default: false },
  user: { type: Schema.ObjectId, required: true },
});
module.exports = model('Todo', todo);
