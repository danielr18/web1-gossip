var express = require('express');
var ejs = require('ejs');
var router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/home');
});

router.get('/home', function(req, res) {
  res.render('home');
});

router.get('/profile', function(req, res) {
  res.render('profile');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/secret', function(req, res) {
  let data = req.body;
  ejs.renderFile('views/gossip.ejs', data, function(err, str) {
    res.send(str);
  });
});

module.exports = router;
