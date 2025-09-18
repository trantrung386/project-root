const express = require('express');
const router = express.Router();
const supplierCtrl = require('../controllers/supplierController');
const { isLoggedIn } = require('../middleware/auth');

router.get('/', supplierCtrl.index);
router.get('/new', isLoggedIn, supplierCtrl.renderNew);
router.post('/', isLoggedIn, supplierCtrl.create);
router.get('/:id/edit', isLoggedIn, supplierCtrl.renderEdit);
router.put('/:id', isLoggedIn, supplierCtrl.update);
router.delete('/:id', isLoggedIn, supplierCtrl.delete);

module.exports = router;
