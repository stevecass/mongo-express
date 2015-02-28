var application_root = __dirname;
var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var express = require('express');
var app = express();

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
      return console.error(err);
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
      console.log(err);
    } else {
      res.send(products);
    }
  });
});

app.get('/api/products/:id', function(req, res) {
  Product.findById(req.params.id, function(err, product){
    if (err) {
      console.log(err);
    } else {
      res.send(product);
    }
  });
});

app.listen(3000);

