const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = class Sms {
  constructor(user) {
    this.phone = user.phone;
    this.from = process.env.TWILIO_PHONE_NUMBER;
  }

  sendOtp(otp) {
    client.messages
      .create({
        body: `Welcome to Exchequer! Your verification code is ${otp} and it expires in 5 minutes`,
        from: this.from,
        to: '+2349019914984',
      })
      .catch((error) => console.log(error));
  }
};
