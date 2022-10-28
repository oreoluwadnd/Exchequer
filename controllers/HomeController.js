const CatchAsync = require('../utils/catchAsync');

exports.HomeController = CatchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Welcome To Exchequer! Visit my github for more info',
      github: 'https://github.com/oredotjs/Exchequer',
    },
  });
});
