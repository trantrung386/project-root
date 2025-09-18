const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const { supplier: supplierId, search } = req.query;
  const filter = {};
  if (supplierId) filter.supplier = supplierId;
  if (search) filter.name = new RegExp(search, 'i');
  const products = await Product.find(filter).populate('supplier');
  const suppliers = await Supplier.find({});
  res.render('products/index', { products, suppliers, selectedSupplier: supplierId || '', search: search || '' });
};

exports.renderNew = async (req, res) => {
  const suppliers = await Supplier.find({});
  res.render('products/new', { suppliers });
};

exports.create = async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  await Product.create({ name, price, quantity, supplier });
  res.redirect('/products');
};

exports.renderEdit = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find({});
  res.render('products/edit', { product, suppliers });
};

exports.update = async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
  res.redirect('/products');
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};
