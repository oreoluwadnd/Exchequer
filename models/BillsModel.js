const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  price: {
    type: Number,
  },
  billsDescription: {
    type: String,
  },
  billsName: {
    type: String,
  },
});

module.exports = BillSchema;
