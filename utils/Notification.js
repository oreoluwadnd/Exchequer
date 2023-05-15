const Email = require('./email');
const catchAsync = require('./catchAsync');

exports.sendLogin = catchAsync(async (user) => {
  const sendLogin = new Email(user, null, null);
  await sendLogin.sendLogin();
});
