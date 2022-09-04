const AppError = require('../utils/AppError');
const User = require('../models/userModel');
const Email = require('../utils/email');
const catchAsync = require('../utils/catchAsync');

exports.getTag = catchAsync(async (req, res, next) => {
  const { tag } = req.body;
  const { user } = req;
  const checkTag = await User.findOne({ tag });
  if (checkTag) {
    next(new AppError('Tag already exists', 400));
  }
  user.tag = tag;
  const userUpdate = await user.save({ validateBeforeSave: false });
  new Email(user, null, null, tag).sendTag();
  res.status(200).json({
    status: 'success',
    data: {
      userUpdate,
    },
  });
});
