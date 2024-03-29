const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A user must have a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'A user must have a phone number'],
    unique: true,
    validate: [validator.isMobilePhone, 'Please provide a valid phone number'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  accountType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  Savings: {
    safeLock: {
      type: Number,
      default: 0,
    },
    PiggyBank: {
      type: Number,
      default: 0,
    },
    target: {
      type: Number,
      default: 0,
    },
  },
  income: {
    type: Number,
    default: 0,
  },
  expense: {
    type: Number,
    default: 0,
  },
  quicksend: [],
  card: {},
  balance: {
    type: Number,
    default: 0,
  },
  verificationMethod: {
    type: String,
    required: [true, 'Please provide a verification method'],
    enum: ['email', 'phone'],
    default: 'email',
  },
  verificationCode: String,
  verificationCodeExpires: Date,
});
userSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
