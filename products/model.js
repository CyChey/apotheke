const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
});

const Model = mongoose.model('Products', productSchema);

module.exports = Model;
