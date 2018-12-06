const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const ProductSchema = new mongoose.Schema({
  name: {type: String, require:true, trim: true},
  title: {type: String, require:true, trim: true},
  price: {type: Number, default: 0},
  description: {type: String, require:true},
  image: {type: String, require:true}
})

ProductSchema.plugin(timestamp);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
