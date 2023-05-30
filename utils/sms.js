const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const AppError = require('./AppError');

module.exports = class Sms {
  constructor(user) {
    this.phone = user.phone;
    this.from = process.env.TWILIO_PHONE_NUMBER;
  }

  sendOtp(otp, next) {
    client.messages
      .create({
        body: `Welcome to Exchequer! Your verification code is ${otp} and it expires in 5 minutes`,
        from: this.from,
        to: this.phone,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.log(error));
  }
};
