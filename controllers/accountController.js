const AppError = require('../utils/AppError');
const User = require('../models/userModel');
const Card = require('../models/cardModel');
const Email = require('../utils/email');
const Transaction = require('../models/transactionModel');
const catchAsync = require('../utils/catchAsync');

exports.createCard = catchAsync(async (req, res, next) => {
  const { cardType } = req.body;
  const { user } = req;
  const cardNumber = Math.floor(
    1000000000000000 + Math.random() * 9000000000000000
  );
  const currentDate = new Date();
  const expiryDate = new Date(
    currentDate.getFullYear() + 3,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const cvc = Math.floor(100 + Math.random() * 900);
  if (!cardType) {
    return next(new AppError('Please provide a cardType', 400));
  }
  const newCard = await Card.create({
    cardType,
    expiryDate,
    cardNumber,
    cvc,
    CardHolder: user._id,
  });
  res.status(200).json({
    status: 'success',
    data: {
      newCard,
    },
  });
});

exports.getCard = catchAsync(async (req, res, next) => {
  const cards = await Card.find().populate('CardHolder');
  res.status(200).json({
    status: 'success',
    data: {
      cards,
    },
  });
});

exports.transferMoney = catchAsync(async (req, res, next) => {
  const { amount, email } = req.body;
  const { user } = req;
  if (!amount || !email) {
    return next(new AppError('Please provide an amount and email', 400));
  }
  const sender = await User.findById(user._id);
  const receiver = await User.findOne({ email });
  if (!sender) {
    next(new AppError('Sender does not exist', 400));
  }
  if (!receiver) {
    next(new AppError('Receiver does not exist', 400));
  }
  if (sender.balance < amount) {
    next(new AppError('Insufficient balance', 400));
  }
  sender.balance - amount;
  receiver.balance + amount;
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
  new Email(sender, null, null, email).sendSenderAlert(
    receiver,
    amount,
    transaction._id
  );
  new Email(receiver, null, null, email).sendReceierAlert(
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

exports.depositCard = catchAsync(async (req, res, next) => {
  const { amount, cardType } = req.body;
  const { user } = req;
  if (!amount) {
    return next(new AppError('Please provide an amount', 400));
  }
  const sender = await User.findById(user._id);
  if (sender.balance < amount) {
    next(new AppError('Insufficient balance', 400));
  }
  const cardUpdate = await Card.findOne({
    $and: [{ CardHolder: user._id }, { cardType: cardType }],
  });
  console.log(cardUpdate);
  if (!cardUpdate) {
    next(new AppError('No Card', 400));
  }
  cardUpdate.cardBalance + amount;
  await cardUpdate.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    data: {
      cardUpdate,
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
    next(new AppError('User does not exist', 400));
  }
  // eslint-disable-next-line no-unused-expressions
  sender.balance + amount;
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
  // eslint-disable-next-line no-unused-expressions
  sender.balance - amount;
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

exports.getBalance = catchAsync(async (req, res, next) => {
  const { user } = req;
  const balance = await User.findById(user._id);
  res.status(200).json({
    status: 'success',
    data: {
      balance,
    },
  });
});

exports.getMyTransactions = catchAsync(async (req, res, next) => {
  const { user } = req;
  const transactions = await Transaction.find({
    $or: [{ sender: user._id }, { receiver: user._id }],
  }).populate('sender receiver');
  res.status(200).json({
    status: 'success',
    data: {
      transactions,
    },
  });
});

exports.getTransactionsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const transaction = await Transaction.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find();
  res.status(200).json({
    status: 'success',
    data: {
      transactions,
    },
  });
});

exports.updateSavingsType = catchAsync(async (req, res, next) => {
  const { amount, savingType } = req.body;
  // const Savings = "Savings"
  const { user } = req;
  if (!amount) {
    return next(new AppError('Please provide an amount', 400));
  }
  const sender = await User.findById(user._id);
  if (!sender) {
    next(new AppError('User does not exist', 400));
  }
  const savings = await User.findOneAndUpdate(
    { _id: user._id },
    {
      $inc: {
        [`Savings.${savingType}`]: amount,
      },
    },
    { new: true }
  );
  if (!savings) {
    next(new AppError('User does not exist', 400));
  }
  console.log(savings);
  res.status(200).json({
    status: 'success',
    data: {
      savings,
    },
  });
});
