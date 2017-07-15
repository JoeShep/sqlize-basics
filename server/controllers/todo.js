'use strict';

// This create function is designed to be a route handler for 
// whichever Express route we'll choose to attach it to. 
const { Todo } = require('../models/');

module.exports = {
  create(req, res , next) {
    return Todo.create({
      title: req.body.title
    })
    .then(todo => res.status(201).send(todo))
    .catch( (error) => res.status(500).send(error));
  }
};
