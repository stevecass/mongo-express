var mongoose = require('mongoose');
var express  = require('express')
var router   = express.Router()
var User     = require('../models/user')(mongoose);


router.get('/api/users/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else if (user === null) {
      res.status(404).send('Not found');
    } else {
      res.send(user);
    }
  });
});

router.get('/api/users', function(req, res){
    User.find(function(err, users){
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else {
      res.send(users);
    }
  });
});

router.post('/api/users', function(req, res){
    var user = new User();
    console.log('params', req.params);
    console.log('body', req.body);
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function(err) {
      console.log('In callback');
      console.log('args', arguments);
      res.redirect('/api/users/' + user._id)
    });

});

module.exports = router;

/*

  user = new User();
  user.username = 'steven';
  user.email = 'steven@example.com';
  user.password = 'pw123456';
  user.save(function(err) {
    console.log('In callback');
    console.log('args', arguments);
  });
  console.log(user);



*/