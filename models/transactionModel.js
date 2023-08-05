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
  status: {
    type: String,
    default: 'success',
    enum: ['pending', 'success', 'failed'],
  },
  date: {
    type: Date,
    required: [true, 'A user must have a last name'],
    default: Date.now(),
  },
});
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
