const { Router } = require('express');
const { body, validationResult, param } = require('express-validator');
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
        console.log(products);
        res.render('products.ejs', {
            cart,
            products,
            isAuthenticated: req.isAuthenticated(),
        })
    } catch (e) {
        next(e);
    }
});

routes.post(
    '/',
    [
        body('name').isString(),
        body('imageUrl').isURL(),
        body('description').isString(),
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            const product = await Products.create({
                name: req.body.name,
                description: req.body.description,
                price: 0,
                imageUrl: req.body.imageUrl,
            }, {

            });
            res.json(product);
        } catch (err) {
            next(err);
        }

    });

routes.patch('/:id', [param('id').isMongoId()], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const product = await Products.findById(req.params.id);
        console.log(product);
        if (!product) {
            res.status(404).end();
        }
        const update = { $set: {} };
        for (const key in req.body) {
            const value = req.body[key];
            if (key && value) {
                update.$set[key] = value;
            }
            console.log(update);
        }
        await Products.updateOne({ _id: req.params.id }, update);
        res.end();
    } catch (e) {
        next(e);
    }

});

routes.put(
    '/:id',
    [
        param('id').isString(),
        body('name').isString(),
        body('imageUrl').isURL(),
        body('description').isString(),
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            await Products.updateOne({ _id: req.params.id }, { $set: req.body });
            res.end();
        } catch (e) {
            next(e);
        }

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


routes.get('/:id', [param('id').isMongoId()], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.toArray());
        }
        const product = await Products.findById(req.params.id);
        res.json(product);
    } catch (err) {
        next(err);
    }
})

module.exports = routes;