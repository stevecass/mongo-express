var application_root = __dirname;
var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var objectIdCheck = require('mongodb').ObjectID;
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mydb');

var productSchema = mongoose.Schema({ name: String, price: Number });
productSchema.prettyPrice = function() {
   return "I cost $" + this.price;
};

var Product = mongoose.model('Product', productSchema);

//Lets set up some sample data
/*
var sampleProducts = [   new Product({name: 'Book', price:14.99 }),   
new Product({name: 'DVD', price:4.76 }),   
new Product({name: 'Washing Machine', price:714.99 })  ];


sampleProducts.forEach(function(ele) { 
  ele.save(function (err, ele) {
    if (err) {
      console.erroror(err);
    }
  });
});
*/

app.get('/', function(req, res){
  res.send('hello world');
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
  product = new Product({
    name: req.body.name,
    price: req.body.price
  });
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
  cb = function(err, product) {};
  product = Product.findById(req.params.id, function(err, product){
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else {
      product.name = req.body.name;
      product.price = req.body.price;
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
          res.status(204);
        }
      });
    }
  });
});

app.listen(3000);

