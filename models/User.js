const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

// virtual setter for password
userSchema.methods.setPassword = async function(password){
  this.passwordHash = await bcrypt.hash(password, 10);
};
userSchema.methods.validatePassword = async function(password){
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
