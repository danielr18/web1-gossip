var express = require('express');
var ejs = require('ejs');
var router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/home');
});

router.get('/home', function(req, res) {
  res.render('home');
});

router.get('/admin', function(req, res) {
  res.render('admin');
});

router.get('/user/:user', function(req, res) {
  res.render('user', {user: req.params.user});
});

router.get('/search', function(req, res) {
  res.render('search');
});

router.get('/logs', function(req, res) {
  res.render('logs');
});

router.get('/login', function(req, res) {
  res.render('login');
});


module.exports = router;
