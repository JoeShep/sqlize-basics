const { Router } = require('express');
const authController = require('../controllers/authcontroller.js');
const passport = require('passport')

const router = Router();

router.get('/signup', authController.signup);
router.post('/signup', passport.authenticate('local-signup', {
   successRedirect: '/dashboard',
   failureRedirect: '/crap'
  }));

router.get('/signin', authController.signin);

module.exports = router;
