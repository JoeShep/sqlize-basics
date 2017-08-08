
module.exports.signup = (req, res) => {
  res.render('signup');
};

module.exports.signin = (req, res) => {
  res.render('signin');
};

module.exports.logout = (req, res) => {
  req.session.destroy( (err) => {
    res.redirect('/');
  });
}

module.exports.dashboard = (req, res) => {
  res.render('dashboard');
};
