const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  balance: {
    type: Number,
  },
  transactionType: {
    type: String,
    enum: ['withdraw', 'transfer', 'deposit'],
  },
});
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
