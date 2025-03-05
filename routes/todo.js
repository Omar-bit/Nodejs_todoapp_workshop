const express = require('express');
const Todo = require('./../models/todo');
const authMiddleware = require('../middlewares/auth');
const todoRouter = express.Router();
todoRouter.use(authMiddleware);
todoRouter.get('/', authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ data: todos, ok: true });
  } catch (err) {
    res.json({ message: 'todo failed', ok: false });
    console.log(err);
  }
});
todoRouter.get('/mine', authMiddleware, async (req, res) => {
  const user = req.user;
  try {
    const todos = await Todo.find({ user: user.user_id });
    res.json({ data: todos, ok: true });
  } catch (err) {
    res.json({ message: 'todo failed', ok: false });
    console.log(err);
  }
});
todoRouter.post('/', async (req, res) => {
  const user = req.user;
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description, user: user.user_id });
    await todo.save();
    res.json({ message: 'todo created successfully', ok: true });
  } catch (err) {
    res.json({ message: 'todo failed', ok: false });
    console.log(err);
  }
});
todoRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  try {
    const todo = await Todo.findById(id);
    if (todo.user.toString() === user.user_id) {
      await Todo.findByIdAndUpdate(id, req.body);
      res.json({ message: 'todo updated successfully', ok: true });
    } else {
      res.json({ message: 'unauthorized', ok: false });
    }
  } catch (err) {
    res.json({ message: 'todo failed', ok: false });
    console.log(err);
  }
});

todoRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  const todo = await Todo.findById(id);
  if (todo) {
    if (todo.user.toString() === user.user_id) {
      await Todo.findByIdAndDelete(id);
      res.json({ message: 'todo deleted successfully', ok: true });
    } else {
      res.json({ message: 'unauthorized', ok: false });
    }
  } else {
    res.json({ message: 'todo failed', ok: false });
  }
});
module.exports = todoRouter;
