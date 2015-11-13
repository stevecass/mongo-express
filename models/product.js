module.exports = function(mgoose) {
  var productSchema = mgoose.Schema({ 
    name: String, 
    description: String,
    price: Number });

  return mgoose.model('Product', productSchema);
};
