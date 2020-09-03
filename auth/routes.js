const { Router } = require('express');
const passport = require('passport');

const routes = Router();

routes.get('/login', (req, res) => {
    res.render('login.ejs', {
    });
});

routes.get(
    '/login/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
    }),
    (req, res, next) => {
        res.redirect('/');
    });

// routes.get('/google/callback', passport.authenticate('google'));
routes.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
})

module.exports = routes;

// routes.get('/google/callback', (req, res, next) => {
//     console.log('Yay')
// })
