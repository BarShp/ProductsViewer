const UserModel = require('../models/userModel');
const router = require('express').Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.send(req.user);
});

router.post('/seedUser', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).send('no fields');
    }
    UserModel.create({
        email: req.body.email,
        password: req.body.password
    }, function (err, result) {
        if (err) {
            res.send(500, err.message);
        }
        else {
            res.json({ status: "success", message: "User added successfully!!!", data: null });
        }
    });
});

router.post('/getToken', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).send('no fields');
    }
    UserModel.findOne({ email: req.body.email })
        .then(result => {
            if (!result) {
                return res.status(400).send('user not found');
            }

            bcrypt.compare(result.password, req.body.password).then(user => {
                const payload = { id: user.id };
                const token = jwt.sign(payload, process.env.PV_JWT_SECRET);
                res.send(token);
            }).catch(err => {
                return res.status(401).send({ err });
            });
        }).catch(err => {
            return res.status(401).send({ err });
        });
}
);

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('i\'m protected');
});

module.exports = router;