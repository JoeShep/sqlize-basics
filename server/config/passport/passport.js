// http://toon.io/understanding-passportjs-authentication-flow/

'use strict';
const passport = require('passport')
const bCrypt = require('bcrypt-nodejs');
const { User } = require('../../models');
// Declare what request (req) fields our usernameField
// and passwordField (passport variables) are
const credentials = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true //allows us to pass the entire request to the callback. Particularly useful for signing up. Why?
}

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

// The Local Strategy allows us to authenticate users by
// looking up their data in the app's database.
module.exports = () => {
  const {Strategy} = require('passport-local');

  passport.use('local-signup', new Strategy(
    // Strategy takes 2 args here: the credentials obj defined at to pof page and a callback function
    credentials,
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

  //LOCAL SIGNIN
  passport.use('local-signin', new Strategy(credentials, (req, email, password, done) => {
    // const User = user;
    const isValidPassword = (userpass, password) => {
      // hashes the passed-in password and compares it to the hashed pword from Firebase
      return bCrypt.compareSync(password, userpass);
    }

    User.findOne({ where: {email} })
    .then( (user) => {
      if (!user) {
        return done(null, false, {message: 'Email does not exist'});
      }
      if (!isValidPassword(user.password, password)) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      const userinfo = user.get();
      return done(null, userinfo);
    })
    .catch( (err) => {
      console.log("Error:", err);
      return done(null, false, {
        message: 'Something went wrong with your sign in'
      });
    });
  }));
};
