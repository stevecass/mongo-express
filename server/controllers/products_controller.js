var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product.js')(mongoose);
var objectID = require('mongodb').ObjectID;
var assigner = require('../lib/assigner');

/* Filters */

/* Let's log all requests */
router.all("*", function(req, res, next){
  console.log(req.method + ' ' + req.url);
  /*
  calling next() continues the chain. Contrast w rails
  where the chain continues unless we stop it with a
  render or redirect
  */
  next();
});

/* Ensure a user session exists */
router.all('/api/products/*', function(req, res, next){
  if (!(req.session && req.session.userId)) {
    console.log('not logged in');
    res.status(401).send('Unauthorized');
  } else {
    console.log('session user', req.session.userId);
    next();
  }
});

/*
  If we get a product id it should be valid format - else return a 404.
  If we don't don this we'll get a crash when we try to use the ID
 */
router.all('/api/products/:id', function(req, res, next){
  if (req.params.id) {
    if (!objectID.isValid(req.params.id)) {
      console.log("Passed invalid object id: " + req.params.id);
      res.status(404).send('Not found');
    } else {
      next();
    }
  } else {
    next();
  }
});


router.get('/', function(req, res){
  res.redirect("/index.html");
});


router.get('/api/products', function(req, res) {
  /* Product.find is supplied by mongoose */
  Product.find(function(err, products){
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else {
      res.send(products);
    }
  });
});

router.get('/api/products/:id', function(req, res) {
  Product.findById(req.params.id, function(err, product){
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else if (product === null) {
      res.status(404).send('Not found');
    } else {
      res.send(product);
    }
  });
});

router.post('/api/products', function(req, res){
  product = new Product();
  /*  We could use ES6 Object.assign but we want to
      filter to just fields on the schema */
  assigner.setObjectFieldsFromParams(product, req.body);
  product.save(function(err, newprod) {
    if (err) {
      res.status(500).send(err.message);
      console.error(err);
    } else {
      res.status(201);
      res.send(product);
    }
  });
});

function saveProduct(res, product) {
  product.save(function(err, product){
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
    } else if (product === null) {
      res.status(404).send('Not found');
    } else {
      res.status(200);
      res.send(product);
    }
  });

}

router.put('/api/products/:id', function(req, res){
  product = Product.findById(req.params.id, function(err, product){
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else if (product === null) {
      res.status(404).send('Not found');
    } else {
      assigner.setObjectFieldsFromParams(product, req.body);
      saveProduct(res, product);
    }
  });
});

router.post('/api/products/:id/comments', function(req, res){
    product = Product.findById(req.params.id, function(err, product){
      if (err) {
        console.error(err);
        res.status(500).send('Error');
      } else if (product === null) {
        res.status(404).send('Not found');
      } else {
        var newComment = {
          body: req.body.body,
          date: new Date()
        };
        console.log(newComment);
        product.comments.push(newComment);
        saveProduct(res, product);
      }
    });

});

router.delete('/api/products/:id', function(req, res){
  product = Product.findById(req.params.id, function(err, product){
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else if (product === null) {
      res.status(404).send('Not found');
    } else {
      product.remove(function (err) {
        if (err) {
          console.error(err);
          res.status(500).send('Error');
        } else {
          res.status(204).send('OK');
        }
      });
    }
  });
});

module.exports = router;