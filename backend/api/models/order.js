

const mongoose = require('mongoose');

//  changed name and price to both required, which makes more sense I guess?
//  name: String => name:  { type:  String, required:  true }
const orderSchema = mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    product:  { type:  mongoose.Schema.Types.ObjectId, ref: 'Product', required:  true},
    quantity: { type:  Number, default:  1 }
});

module.exports = mongoose.model('Order', orderSchema);