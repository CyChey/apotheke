const { Router } = require('express');
const Cart = require('./model');
const Product = require('../products/model');
const { body } = require('express-validator');
const { isLoggedIn } = require('../auth/middleware');

const routes = Router();

routes.get(
    '/',
    isLoggedIn,
    async (req, res, next) => {
        try {
            const cart = await Cart.find({
                userId: req.user.id
            });
            res.render('cart.ejs', {
                cart,
                isAuthenticated: req.isAuthenticated(),
            })
        } catch (err) {
            next(err);
        }
    });

routes.post(
    '/',
    isLoggedIn,
    body('productId').isMongoId(),
    async (req, res, next) => {
        try {
            const product = await Product.findById(req.body.productId);
            console.log(product);
            await Cart.create({
                userId: req.user.id,
                productId: req.body.productId,
            }, { upsert: true });
            res.end();
        } catch (err) {
            next(err);
        }

    });

routes.delete('/product/:id', isLoggedIn, async (req, res, next) => {
    try {
        await Cart.deleteOne({
            productId: req.params.id,
            userId: req.user.id,
        });
        res.end();
    } catch (e) {
        next(e);
    }

})

module.exports = routes;