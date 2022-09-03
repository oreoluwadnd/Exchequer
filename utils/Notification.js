const Email = require('./email');

exports.sendLogin = async (user) => {
  const sendLogin = new Email(user, null, null);
  await sendLogin.sendLogin();
};
