'use strict';

const { Router } = require('express');
const { todos, todoItems } = require('../controllers');
const router = Router();

router.use(require('./auth'));

// if the http request is a GET for the whole API
router.get('/api', (req, res, next) => res.status(200).send({
  message: "Welcome to the todos API!"
}));

// todos lists
router.post('/api/todos', todos.create);
router.get('/api/todos', todos.list);

// todos items

// wait, what is this?
router.post('/api/todo/:todoId/items', todoItems.create)

module.exports = router;
