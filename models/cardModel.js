const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: Number,
  },
  expiryDate: {
    type: Date,
  },
  cardBalance: {
    type: String,
    default: 0,
  },
  billingAddress: {
    type: String,
    default: '678 Joysticks Road RWE 908-3',
  },
  city: {
    type: String,
    default: 'New York',
  },
  cvc: {
    type: Number,
  },
  state: {
    type: String,
    default: 'Delaware',
  },
  zipCode: {
    type: String,
    default: 201202,
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
const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
