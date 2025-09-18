const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

router.get('/register', authCtrl.renderRegister);
router.post('/register', authCtrl.register);

router.get('/login', authCtrl.renderLogin);
router.post('/login', authCtrl.login);

router.post('/logout', authCtrl.logout);

router.get('/forgot', authCtrl.renderForgot);
router.post('/forgot', authCtrl.sendReset);

module.exports = router;
