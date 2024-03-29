const dontenv = require('dotenv');
const crypto = require('crypto');
const Email = require('./email');
const Sms = require('./sms');
const AppError = require('./AppError');

dontenv.config({ path: './config.env' });

exports.otpCycle = async (user) => {
  const digits = process.env.OTP_SECRET;
  let OTP = '';
  for (let i = 0; i < process.env.OTP_LENGTH; i += 1) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  const expires = Date.now() + 5 * 60 * 1000; // 5 minute
  console.log(OTP);
  if (user.verificationMethod === 'email') {
    const sendOtp = new Email(user, OTP);
    await sendOtp.sendOtp();
  }
  if (user.verificationMethod === 'phone') {
    const sendSmsOtp = new Sms(user, OTP);
    sendSmsOtp.sendOtp(OTP);
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
