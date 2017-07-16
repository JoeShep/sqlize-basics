'use strict';

// This create function is designed to be a route handler for 
// whichever Express route we'll choose to attach it to. 
const { Todo } = require('../models/');

module.exports = {
  // Note the cool shorthand for method def
  create(req, res , next) {
    return Todo.create({
      title: req.body.title
    })
    .then(todo => res.status(201).send(todo))
    .catch( (error) => res.status(500).send(error));
  },
  list(req, res, next) {
    return Todo.all()
    .then( (todos) => res.status(200).send(todos))
    .catch( (err) => res.status(500).send(err));
  }
};
