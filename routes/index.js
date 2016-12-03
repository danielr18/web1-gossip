var express = require('express');
var ejs = require('ejs');
var router = express.Router();
let count = 0;

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

router.post('/gossip/up', function(req, res) {
  res.send({message: 'good'});
});

router.post('/gossip/down', function(req, res) {
  res.send({message: 'good'});
});

router.post('/gossip/create', function(req, res) {
  count++;
  res.send({
    message: 'Good',
    data: {
      id_gossip: count,
      status: 1,
      karma: 0,
    }
  });
});

router.post('/secret', function(req, res) {
  let data = req.body;
  ejs.renderFile('views/gossip.ejs', data, function(err, str) {
    res.send(str);
  });
});

module.exports = router;
