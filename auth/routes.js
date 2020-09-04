const { Router } = require('express');
const passport = require('passport');

const routes = Router();

routes.get(
    '/login/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
    }),
    (req, res, next) => {
        res.redirect('/');
    });


routes.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
})

routes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = routes;


