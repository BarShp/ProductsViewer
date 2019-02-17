const express = require('express'),
    router = express.Router(),
    productsController = require('../controllers/productsController'),
    passport = require('../config/passport');

router.get('/all:page?', passport.authenticate('jwt', { session: false }), productsController.getProducts);
router.get('/product:id', passport.authenticate('jwt', { session: false }), productsController.getProductById);
router.get('/autocomplete', passport.authenticate('jwt', { session: false }), productsController.getFieldAutocomplete);

module.exports = router;