const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            const user = await User.findOne({ googleId: profile.id });
            if (user) {
                cb(null, user);
            } else {
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                });
                cb(null, newUser);
            }
        } catch (err) {
            cb(err);
        }

    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});