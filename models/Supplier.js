const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Supplier', supplierSchema);
