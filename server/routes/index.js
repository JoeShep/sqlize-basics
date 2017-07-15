'use strict';

const { Router } = require('express');
const { todos } = require('../controllers');
const router = Router();

// if the http request is a GET
router.get('/api', (req, res, next) => res.status(200).send({
  message: "Welcome to the todos API!"
}));

// if the http req is a POST
router.post('/api/todos', todos.create);

module.exports = router;
