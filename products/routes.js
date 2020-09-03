const { Router } = require('express');
const Products = require('./model');
const Cart = require('../cart/model');

const routes = Router();

routes.get('/', async (req, res, next) => {
    const { user: { id: userId } = {} } = req;
    try {
        const [products, cart] = await Promise.all([
            Products.find({}),
            Cart.find({ userId }),
        ]);
        res.render('products.ejs', {
            cart,
            products,
            isAuthenticated: req.isAuthenticated(),
        })
    } catch (e) {
        next(e);
    }
});

routes.post('/', (req, res, next) => {
    console.log(req.body);
    Products.create({
        name: req.body.name,
        description: req.body.description,
        price: 0,
        imageUrl: 'https://i.imgur.com/3VJlL4M.png',
    }, (err, data) => {
        if (err) {
            next(err);
        } else {
            res.end();
        }
    });
});

routes.delete('/:id', (req, res, next) => {
    Products.deleteOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            next(err);
        } else {
            res.end();
        }
    });
});

module.exports = routes;