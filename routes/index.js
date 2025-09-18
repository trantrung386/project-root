const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
  // show some products on home and supplier menu
  const suppliers = await Supplier.find({});
  const products = await Product.find({}).populate('supplier').limit(12);
  res.render('index', { suppliers, products });
});

module.exports = router;
