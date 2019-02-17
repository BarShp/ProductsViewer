const express = require('express'),
    router = express.Router(),
    authController = require('../controllers/authController');

const passport = require('../config/passport');

router.get('/getUser', passport.authenticate('jwt', { session: false }), authController.getUser);
router.post('/registerUser', authController.registerUser);
router.post('/getToken', authController.getToken);
// router.get('/logout', userController.logout);

module.exports = router;