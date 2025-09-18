const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');
const { isLoggedIn } = require('../middleware/auth');

router.get('/', productCtrl.index);
router.get('/new', isLoggedIn, productCtrl.renderNew);
router.post('/', isLoggedIn, productCtrl.create);
router.get('/:id/edit', isLoggedIn, productCtrl.renderEdit);
router.put('/:id', isLoggedIn, productCtrl.update);
router.delete('/:id', isLoggedIn, productCtrl.delete);

module.exports = router;
