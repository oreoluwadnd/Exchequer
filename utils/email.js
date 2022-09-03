const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, otp, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.otp = otp;
    this.from = process.env.EMAIL_FROM;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  async send(subject, text) {
    // const html = await this.html(template);;
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
      //   html,
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome', "You're now a member");
  }

  async sendOtp() {
    await this.send(
      'Welcome to Exchequer!',
      `Hello ${this.firstName} Your verification code is ${this.otp} and it expires in 5 minutes`
    );
  }

  async sendLogin() {
    await this.send(
      'Exchequer Login Notification',
      `You have successfully logged in ${new Date().toLocaleDateString(
        'en-us',
        { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
      )}`
    );
  }

  async sendPasswordReset() {
    await this.send('Password Reset', 'You can reset your password here');
  }

  async sendPasswordChanged() {
    await this.send('Password Changed', 'Password reset Successful');
  }
};
