module.exports = function(mongoose) {
  var productSchema = mongoose.Schema({ 
    name: String, 
    description: String,
    price: Number });

  return mongoose.model('Product', productSchema);
};


//Lets set up some sample data
// var sampleProducts = [   new Product({name: 'Book', price:14.99 }),   
// new Product({name: 'DVD', price:4.76 }),   
// new Product({name: 'Washing Machine', price:714.99 })  ];


// sampleProducts.forEach(function(ele) { 
//   ele.save(function (err, ele) {
//     if (err) {
//       console.erroror(err);
//     }
//   });
// });

