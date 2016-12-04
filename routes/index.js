var express = require('express');
var ejs = require('ejs');
var router = express.Router();
let count = 0;
var gossipArray = [];

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

router.get('/gossip/all', function(req,res){
  console.log(gossipArray);
  res.send({
    message:'All gossips sent',
    gossips: gossipArray
  });
});

router.post('/gossip/up', function(req, res) {
  console.log(req.body);
  let id = req.body.id_gossip;
  let index = gossipArray.map(function(gossip){
    return gossip.id_gossip;
  }).indexOf(id);
  gossipArray[index].ka_gossip+=1;
  res.send({message: 'Karma raised'});
});

router.post('/gossip/down', function(req, res) {
  let id = req.body.id_gossip;
  let index = gossipArray.map(function(gossip){
    return gossip.id_gossip;
  }).indexOf(id);
  gossipArray[index].ka_gossip-=1;
  res.send({message: 'Karma decreased'});
});

router.post('/gossip/create', function(req, res) {
  count++;
  let data = req.body;
  let gossip = {
    id_gossip : count,
    id_usuario : data.id_usuario,
    de_gossip : data.de_gossip,
    ka_gossip : 0,
    da_gossip : new Date(),
    id_gossip_status: 1,
    de_gossip_status: 'Avaliable'
  };
  gossipArray.push(gossip);

  res.send({
    message: 'Gossip added',
  });
});

router.get('/gossip/delete',function(req, res) {
  console.log(req.body); //undefined
  let id = parseInt(req.param('id_gossip'));
  let index = gossipArray.map(function(gossip){
    return gossip.id_gossip;
  }).indexOf(id);
  gossipArray[index].id_gossip_status = 0;
  res.send({message: `Gossip ${id} deleted`});
});

router.get('/admin/gossip/delete',function(req, res) {
  console.log(req.body); //undefined
  let id = parseInt(req.param('id_gossip'));
  let index = gossipArray.map(function(gossip){
    return gossip.id_gossip;
  }).indexOf(id);
  gossipArray[index].id_gossip_status = 0;
  res.send({message: `Gossip ${id} deleted`});
});


module.exports = router;
