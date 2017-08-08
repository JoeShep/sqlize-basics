const { Router } = require('express');
const authController = require('../controllers/authcontroller.js');
const passport = require('passport')

const router = Router();

// register users
router.get('/signup', authController.signup);
router.post('/signup', passport.authenticate('local-signup', {
    // More passport built-in goodness
    successRedirect: '/dashboard',
    failureRedirect: '/crap'
  }
));

// login / logout users
router.get('/signin', authController.signin);
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin'
  }
));
// calls isLoggedIn before calling dashboard to guard against going to /dashboard if no user
router.get('/dashboard', isLoggedIn, authController.dashboard);
router.get('/logout', authController.logout);

// A middleware function to run on the get /dashboard route
function isLoggedIn(req, res, next) {
  // next() moves us to the next stop on the request's journey. Here, that is only called if
  // the user exists. If not, we redirect to signin instead of moving on to calling dashboard
  // isAuthenticated is a Passport method
  if (req.isAuthenticated())
    return next();
  res.redirect('/signin');
}

module.exports = router;
