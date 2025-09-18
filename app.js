require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// ---------------- MONGOOSE ----------------
mongoose.set('strictQuery', true); // tắt cảnh báo
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crud-demo';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Mongo connected'))
.catch(err => console.error(err));

// ---------------- VIEW ENGINE ----------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// ---------------- MIDDLEWARE ----------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// ---------------- SESSION ----------------
const sessionSecret = process.env.SESSION_SECRET || 'mySuperSecret123!';
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoURI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 ngày
}));

// ---------------- LOCALS ----------------
app.use((req, res, next) => {
  res.locals.session = req.session;                  // dùng trong layout EJS
  res.locals.currentUser = req.session.user || null; // tiện dùng trực tiếp
  res.locals.title = 'Website CRUD';
  next();
});

// ---------------- ROUTES ----------------
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const supplierRoutes = require('./routes/suppliers');
const productRoutes = require('./routes/products');

app.use('/auth', authRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);
app.use('/', indexRoutes);

// ---------------- 404 ----------------
app.use((req, res) => res.status(404).send('404 Not Found'));

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
