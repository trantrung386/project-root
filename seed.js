const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);           // bật layouts
app.set('layout', 'layout'); 

async function seed() {
  await mongoose.connect('mongodb://127.0.0.1:27017/crud-demo');

  // Xóa dữ liệu cũ
  await Supplier.deleteMany({});
  await Product.deleteMany({});

  // Tạo supplier
  const samsung = await Supplier.create({ name: 'Samsung', address: 'Seoul', phone: '0123456789' });
  const apple   = await Supplier.create({ name: 'Apple', address: 'Cupertino', phone: '0987654321' });

  // Tạo sản phẩm
  await Product.create([
    { name: 'Galaxy S24', price: 1000, quantity: 10, supplier: samsung._id },
    { name: 'iPhone 15', price: 1200, quantity: 15, supplier: apple._id },
    { name: 'Galaxy Watch', price: 300, quantity: 25, supplier: samsung._id },
    { name: 'AirPods Pro', price: 250, quantity: 30, supplier: apple._id }
  ]);

  console.log('✅ Seed dữ liệu thành công!');
  process.exit();
}

seed().catch(err => console.error(err));
