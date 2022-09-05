const AppError = require('../utils/AppError');
const User = require('../models/userModel');
const Email = require('../utils/email');
const Transaction = require('../models/transactionModel');
const catchAsync = require('../utils/catchAsync');

exports.getTag = catchAsync(async (req, res, next) => {
  const { tag } = req.body;
  const { user } = req;
  if (!tag) {
    return next(new AppError('Please provide a tag', 400));
  }
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

exports.transferMoney = catchAsync(async (req, res, next) => {
  const { amount, tag } = req.body;
  const { user } = req;
  if (!amount || !tag) {
    return next(new AppError('Please provide an amount and tag', 400));
  }
  const sender = await User.findById(user._id);
  const receiver = await User.findOne({ tag });
  if (!sender) {
    next(new AppError('Sender does not exist', 400));
  }
  if (!receiver) {
    next(new AppError('Receiver does not exist', 400));
  }
  if (sender.balance < amount) {
    next(new AppError('Insufficient balance', 400));
  }
  sender.balance -= amount;
  receiver.balance += amount;
  await sender.save({ validateBeforeSave: false });
  await receiver.save({ validateBeforeSave: false });
  const transaction = await Transaction.create({
    amount,
    balance: sender.balance,
    sender: user._id,
    receiver: receiver._id,
    transactionType: 'transfer',
  });
  await user.save({ validateBeforeSave: false });
  await receiver.save({ validateBeforeSave: false });
  new Email(sender, null, null, tag).sendSenderAlert(
    receiver,
    amount,
    transaction._id
  );
  new Email(receiver, null, null, tag).sendReceierAlert(
    sender,
    amount,
    transaction._id
  );

  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

exports.depositMoney = catchAsync(async (req, res, next) => {
  const { amount } = req.body;
  const { user } = req;
  if (!amount) {
    return next(new AppError('Please provide an amount', 400));
  }
  const sender = await User.findById(user._id);
  if (!sender) {
    next(new AppError('Sender does not exist', 400));
  }
  sender.balance += amount;
  const transaction = await Transaction.create({
    balance: sender.balance,
    amount,
    transactionType: 'deposit',
  });
  await sender.save({ validateBeforeSave: false });
  new Email(user, null, null, null).sendDeposit(amount, transaction._id);
  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

exports.withdrawMoney = catchAsync(async (req, res, next) => {
  const { amount } = req.body;
  const { user } = req;
  if (!amount) {
    return next(new AppError('Please provide an amount', 400));
  }
  const sender = await User.findById(user._id);
  if (sender.balance < amount) {
    next(new AppError('Insufficient balance', 400));
  }
  sender.balance -= amount;
  await user.save({ validateBeforeSave: false });
  const transaction = await Transaction.create({
    amount,
    balance: sender.balance,
    sender: user._id,
    transactionType: 'withdraw',
  });
  new Email(user, null, null).sendWithdrawal(amount, transaction._id);
  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});
