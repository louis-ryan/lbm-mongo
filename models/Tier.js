const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  stripeCustomerId: String,
  paymentId: String,
  paymentStatus: {
    type: String,
    default: 'unpaid'
  }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);


