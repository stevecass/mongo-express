var application_root = __dirname;
var publicDir = application_root + "/public";
var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var objectID = require('mongodb').ObjectID;
app.use(bodyParser.json());
app.use(express.static(publicDir));
mongoose.connect('mongodb://localhost/mydb');

var Product = require('./models/product.js')(mongoose);

var setObjectFieldsFromParams = function(obj, params) {
  for (k in obj.schema.paths) {
    if (params[k]) {
      obj[k] = params[k];
    }
  }
};


app.get('/', function(req, res){
  res.send('hello world');
});

app.all('/api/products/:id', function(req, res, next){
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

app.get('/api/products', function(req, res) {
  Product.find(function(err, products){
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else {
      res.send(products);
    }
  });
});

app.get('/api/products/:id', function(req, res) {
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

app.post('/api/products', function(req, res){
  product = new Product();
  setObjectFieldsFromParams(product, req.body);
  product.save(function(err, newprod) {
    if (err) {
      res.status(500).send('Error');
      console.error(err);
    } else {
      res.status(201);
      res.send(product);
    }
  });
});

app.put('/api/products/:id', function(req, res){
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
          res.status(500).send('Error');
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

app.delete('/api/products/:id', function(req, res){
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

app.listen(3000);

