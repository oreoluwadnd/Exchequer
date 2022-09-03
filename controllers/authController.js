const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const optGenerator = require('../utils/otp');
const jwt = require('../utils/jwt');
const Notification = require('../utils/Notification');

exports.signUp = catchAsync(async (req, res, next) => {
  const {
    email,
    phone,
    password,
    passwordConfirm,
    verificationMethod,
    firstName,
    lastName,
  } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    passwordConfirm,
    verificationMethod,
  });
  req.user = user;
  next();
});

exports.sendOtp = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { hashedOtp, tokenExpires } = await optGenerator.otpCycle(user);
  user.verificationCode = hashedOtp;
  user.verificationCodeExpires = tokenExpires;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    data: {
      user: user.email,
      message: `Please check your ${user.verificationMethod} for your OTP`,
    },
  });
});

exports.verifyOtp = catchAsync(async (req, res, next) => {
  const { otp, email } = req.body;
  if (!otp || !email) {
    return next(new AppError('Please provide an OTP and email', 400));
  }
  const user = await User.findOne({ email }).select(
    '-__v -passwordChangedAt -passwordResetToken -passwordResetExpires'
  );
  if (!user) {
    return next(new AppError('No user found with that email', 404));
  }
  const isOtpValid = await optGenerator.verifyOtp(user, otp);
  if (!isOtpValid) {
    return next(new AppError('Invalid OTP', 400));
  }
  const isOtpExpired = await optGenerator.verifyOtpExpiry(user);
  if (!isOtpExpired) {
    return next(new AppError('OTP has expired', 400));
  }
  user.verificationCode = undefined;
  user.verificationCodeExpires = undefined;
  user.isVerified = true;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Account Verified! Pls Login',
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password, phone } = req.body;
  if (!email && !phone) {
    return next(new AppError('Please provide email or Phone', 400));
  }
  if (!password) {
    return next(new AppError('Please provide password', 400));
  }
  const query = email ? { email: email } : { phone: phone };
  const user = await User.findOne({ query }).select('+password');
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  if (!user.isVerified) {
    return next(new AppError('Please verify your account', 401));
  }

  jwt.createToken(res, req, user);
  Notification.sendLogin(user);
  res.status(200).json({
    status: 'success',
    user,
  });
});
