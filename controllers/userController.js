const User = require('../models/userModel');
const CatchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllUsers = CatchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getUser = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = CatchAsync(async (req, res, next) => {
  const { user } = req;
  const userDetails = await User.findById(user._id);
  res.status(200).json({
    status: 'success',
    data: {
      userDetails,
    },
  });
});

//ADD FILTER  BODY
exports.updateMe = CatchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfrim) {
    return next(
      new AppError(
        'This route is not for password updates . Please use /updatePassword',
        400
      )
    );
  }
  const { user } = req;
  const userDetails = await User.findByIdAndUpdate(user._id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      userDetails,
    },
  });
});
