const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const UserModel = require('../models/userModel');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PV_JWT_SECRET
};

const strategy = new JwtStrategy(opts, (payload, next) => {
    UserModel.findById(payload.id).then(res => {
        next(null, res);
    });
});

passport.use(strategy);

module.exports = passport;