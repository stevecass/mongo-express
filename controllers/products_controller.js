var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product.js')(mongoose);
var objectID = require('mongodb').ObjectID;

var setObjectFieldsFromParams = function(obj, params) {
  for (var k in obj.schema.paths) {
    if (params[k]) {
      obj[k] = params[k];
    }
  }
};

router.get('/', function(req, res){
  res.redirect("/index.html");
});

router.all('/api/products/:id', function(req, res, next){
  // If we get a product id it should be valid - else return a 404
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

router.get('/api/products', function(req, res) {

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
  setObjectFieldsFromParams(product, req.body);
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

router.put('/api/products/:id', function(req, res){
  product = Product.findById(req.params.id, function(err, product){
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else if (product === null) {
      res.status(404).send('Not found');
    } else {
      setObjectFieldsFromParams(product, req.body);
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