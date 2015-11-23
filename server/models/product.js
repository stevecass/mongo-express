module.exports = function(mgoose) {
  var productSchema = mgoose.Schema({
    name: String,
    description: String,
    price: Number,
    comments: [{ body: String, date: Date }]
   });

  return mgoose.model('Product', productSchema);
};
