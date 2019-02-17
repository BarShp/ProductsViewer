const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'),
    saltRounds = 10;

module.exports = {
    registerUser: (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            return res.status(401).send('no fields');
        }
        UserModel.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, saltRounds)
        }, function (err, user) {
            if (err) {
                res.status(500).send(err.message);
            }
            else {
                const payload = { id: user.id };
                const token = jwt.sign(payload, process.env.PV_JWT_SECRET);
                return res.send({ token: token });
            }
        });
    },
    getToken: (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            return res.status(401).send('no fields');
        }
        UserModel.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(400).send('user not found');
                }

                bcrypt.compare(req.body.password, user.password, (err, matched) => {
                    if (err) {
                        return res.status(401).send({ err });
                    }
                    if (matched) {
                        const payload = { id: user.id };
                        const token = jwt.sign(payload, process.env.PV_JWT_SECRET);
                        return res.send({ token: token });
                    }
                    return res.status(400).send('Password Incorrect');
                });
            }).catch(err => {
                return res.status(401).send({ err });
            });
    },
    getUser: (req, res, next) => {
        return res.send({ email: req.user.email, _id: req.user._id });
    }
}