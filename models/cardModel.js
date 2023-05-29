const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  cardNumber: {
    type: Number,
  },
  expiryDate: {
    type: Date,
  },
  cardBalance: {
    type: String,
  },
  billingAddress: {
    type: String,
  },
  city: {
    type: String,
  },
  cvc: {
    type: Number,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  cardType: {
    type: String,
    enum: ['visa', 'master', 'giftCard'],
  },
  CardHolder: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
