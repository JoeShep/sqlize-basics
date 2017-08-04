'use strict';

// basic sqlize stuff based on this tut:
// https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize

// Auth stuff based on this tut
// https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537

// To run this app:
// Run the PG server
// On the CL, type `npm run start:dev` then go to localhost:8000/api

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const passport = require('passport');
const session = require('express-session');
const env = require('dotenv').load();

// templates
const exphbs = require('express-handlebars')

// define our instance of Express
const app = express();

// TODO: Figure out why this sets up routes for auth
// const authRoute = require('./server/routes/auth.js')(app);

// set the template engine
//For Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

const routes = require('./server/routes');

// middleware-- run on every request
app.use(logger('dev'))

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// For Passport
require('./server/config/passport/passport.js')();
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// We have to require our routes before the app.get('*', ...) catch-all route
// because the catch-all route will match any route and serve the welcome message,
// If we require our other routes after it, those other routes will never be hit.
app.use(routes);
// Default route runs on every request and logs a greeting
app.get('*', (req, res) => {
  res.status(200).send(({message: "Hooray for sequelize! No more Bookshelf!"}));
});

module.exports = app;
