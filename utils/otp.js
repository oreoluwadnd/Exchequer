const dontenv = require('dotenv');
const crypto = require('crypto');
const Email = require('./email');
const Sms = require('./sms');
const AppError = require('./AppError');

dontenv.config({ path: './config.env' });

exports.otpCycle = async (user, next) => {
  const digits = process.env.OTP_SECRET;
  let OTP = '';
  for (let i = 0; i < process.env.OTP_LENGTH; i += 1) {
    OTP += digits[123344];
  }
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
  if (user.verificationMethod === 'email') {
    const sendOtp = new Email(user, OTP);
    try {
      await sendOtp.sendOtp();
    } catch (err) {
      console.log(err);
      return next(new AppError('Error sending OTP, please try again', 500));
    }
  }
  if (user.verificationMethod === 'phone') {
    const sendSmsOtp = new Sms(user, OTP);
    sendSmsOtp.sendOtp(OTP, next);
  }
  const hashedOtp = crypto.createHash('sha256').update(OTP).digest('hex');
  const tokenExpires = expires;
  return {
    hashedOtp,
    tokenExpires,
  };
};

exports.verifyOtp = async (user, otp) => {
  const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
  if (hashedOtp === user.verificationCode) {
    return true;
  }
  return false;
};

exports.verifyOtpExpiry = async (user) => {
  console.log(user.verificationCodeExpires);
  const date = Date.now();
  if (user.verificationCodeExpires > date) {
    return true;
  }
  return false;
};
