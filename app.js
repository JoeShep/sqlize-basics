'use strict';

// To run this app:
// Run the PG server
// On the CL, type `npm run start:dev` then go to localhost:8000/api

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./server/routes');

// middleware-- run on every request
app.use(logger('dev'))

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// We have to require our routes before the app.get('*', ...) catch-all route
// because the catch-all route will match any route and serve the welcome message,
// If we require our other routes after it, those other routes will never be hit.
app.use(routes);
// Default route runs on every request and logs a greeting
app.get('*', (req, res) => {
  res.status(200).send(({message: "Hooray for sequelize! No more Bookshelf!"}));
});

module.exports = app;
