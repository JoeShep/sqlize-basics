'use strict';

const { TodoItem } = require('../models/');

module.exports = {
  create(req, res, next) {
    return TodoItem.create({
      content: req.body.content,
      todoId: req.params.todoId
    })
    .then( (todoItem) => res.status(201).send(todoItem))
    .catch( (err) => res.status(500).send(err));
  }
};
