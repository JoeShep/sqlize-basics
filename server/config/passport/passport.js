'use strict';
const passport = require('passport')
const bCrypt = require('bcrypt-nodejs');
const { User } = require('../../models');

// Passport has to save a user ID in the session,
// and it uses this to manage retrieving the user details when needed.
// In this function, we will be saving the user id to the session
//serialize
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Here, we use the Sequelize findById promise to get the user,
// and if successful, an instance of the Sequelize model is returned.
// To get the User object from this instance, we use the Sequelize
// getter function like this: user.get()
passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

module.exports = () => {
  const {Strategy} = require('passport-local');

  // Declare what request (req) fields our usernameField
  // and passwordField (passport variables) are
  passport.use('local-signup', new Strategy(
    // Strategy takes 2 args here: an obj and a callback function
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true //allows us to pass the entire request to the callback. Particularly useful for signing up. Why?
    },
    // callback
    (req, email, password, done) => {
      // define a function to call if the user is not already in the db
      const generateHash = (password) => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)
      };

      // Check if user already exists before saving them to the db
      User.findOne({ where: {email} })
      .then( (user) => {
        if (user) {
          return done(null, false, {
            message: 'That email is already taken'
          });
        } else {
            const hashedPassword = generateHash(password);
            const data = {
              email,
              password: hashedPassword,
              // data from form svaed as property on req. body by body-parser
              firstname: req.body.firstname,
              lastname: req.body.lastname
            };
            // create() is a Sequelize method for adding new entries to the database
            User.create(data)
            .then( (newUser, created) => { //what is "created"?
              return newUser ? done(null, newUser) : done(null, false);
            });
          }
      });
    }
  ));
};
