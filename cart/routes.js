const { Router } = require('express');
const Cart = require('./model');
const passport = require('passport');

const routes = Router();

routes.get('/', async (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    }
    try {
        const cart = await Cart.find({
            userId: req.user.id
        });
        res.render('cart.ejs', {
            cart,
        })
    } catch (err) {
        next(err);
    }
});

routes.post(
    '/',
    (req, res, next) => {
        console.log(req.body);
        if (!req.body.productId) {
            res.status(400).end();
        } else {
            next();
        }
    },
    (req, res, next) => {
        if (!req.user) {
            res.status(401).end();
        } else {
            next();
        }
    },
    async (req, res, next) => {
        try {
            await Cart.create({
                userId: req.user.id,
                productId: req.body.productId,
            }, { upsert: true });
            res.end();
        } catch (err) {
            console.log(err);
            next(err);
        }

    });

module.exports = routes;