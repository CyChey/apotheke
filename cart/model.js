const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: String,
    productId: String,
    quantity: Number,
});

cartSchema.methods.getCartForUser = function (userId) {
    return mongoose.model('Cart').find({ userId });
}

cartSchema.methods.addProductToCart = function (userId, productId) {
    return mongoose.model('Cart').create({
        userId,
        productId,
    }, { upsert: true });
}

const Model = mongoose.model('Cart', cartSchema);

module.exports = Model;
