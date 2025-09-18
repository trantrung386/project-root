const User = require('../models/User');
const nodemailer = require('nodemailer');

// ---------------- REGISTER ----------------

// Render trang đăng ký
exports.renderRegister = (req, res) => {
  res.render('auth/register');
};

// Xử lý đăng ký
exports.register = async (req, res) => {
  const { username, password, email, phone } = req.body;
  try {
    const user = new User({ username, email, phone });
    await user.setPassword(password);
    await user.save();

    // Lưu session và save trước redirect
    req.session.user = { id: user._id, username: user.username };
    req.session.success = 'Đăng ký thành công!';
    req.session.save(err => {
      if (err) console.error(err);
      res.redirect('/');
    });
  } catch (err) {
    console.error(err);
    req.session.error = 'Lỗi khi tạo tài khoản';
    res.redirect('/auth/register');
  }
};

// ---------------- LOGIN ----------------

// Render trang login
exports.renderLogin = (req, res) => {
  res.render('auth/login');
};

// Xử lý login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      req.session.error = 'Tên đăng nhập hoặc mật khẩu không đúng';
      return res.redirect('/auth/login');
    }

    const valid = await user.validatePassword(password);
    if (!valid) {
      req.session.error = 'Tên đăng nhập hoặc mật khẩu không đúng';
      return res.redirect('/auth/login');
    }

    // Lưu session và save trước redirect
    req.session.user = { id: user._id, username: user.username };
    req.session.success = 'Đăng nhập thành công!';
    req.session.save(err => {
      if (err) console.error(err);
      const redirectTo = req.session.returnTo || '/';
      delete req.session.returnTo;
      res.redirect(redirectTo);
    });

  } catch (err) {
    console.error(err);
    req.session.error = 'Lỗi server';
    res.redirect('/auth/login');
  }
};

// ---------------- LOGOUT ----------------

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error('Logout error:', err);
    res.clearCookie('connect.sid'); // xóa cookie session client
    res.redirect('/');
  });
};

// ---------------- FORGOT PASSWORD ----------------

// Render trang quên mật khẩu
exports.renderForgot = (req, res) => res.render('auth/forgot');

// Gửi email reset password
exports.sendReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.session.success = 'Nếu tài khoản tồn tại, link reset đã được gửi.';
      return res.redirect('/auth/forgot');
    }

    // Cấu hình nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const resetLink = `${req.protocol}://${req.get('host')}/auth/reset-demo`;
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@example.com',
      to: email,
      subject: 'Password reset',
      text: `Click here to reset: ${resetLink}`
    });

    req.session.success = 'Nếu tài khoản tồn tại, link reset đã được gửi.';
    req.session.save(err => {
      if (err) console.error(err);
      res.redirect('/auth/forgot');
    });

  } catch (err) {
    console.error(err);
    req.session.error = 'Lỗi gửi email';
    res.redirect('/auth/forgot');
  }
};
