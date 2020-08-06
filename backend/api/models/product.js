
const mongoose = require('mongoose');

//  changed name and price to both required, which makes more sense I guess?
//  name: String => name:  { type:  String, required:  true }
const productSchema = mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    name:  { type:  String, required:  true },
    price:  { type:  Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);