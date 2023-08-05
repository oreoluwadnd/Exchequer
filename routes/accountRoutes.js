const express = require('express');
const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');

const Router = express.Router();

Router.route('/withdraw').post(
  authController.autheticateUser,
  accountController.withdrawMoney
);
Router.route('/deposit').post(
  authController.autheticateUser,
  accountController.depositMoney
);
Router.route('/transfer').post(
  authController.autheticateUser,
  accountController.transferMoney
);

Router.route('/createCard').post(
  authController.autheticateUser,
  accountController.createCard
);

Router.route('/getAllCard').get(
  authController.autheticateUser,
  accountController.getCard
);

Router.route('/fundCard').post(
  authController.autheticateUser,
  accountController.depositCard
);

Router.route('/updateSavings').patch(
  authController.autheticateUser,
  accountController.updateSavingsType
);
//ADD TO CONTROLLER
Router.route('/getBalance').get(
  authController.autheticateUser,
  accountController.getBalance
);
Router.route('/getMyTransactions').get(
  authController.autheticateUser,
  accountController.getMyTransactions
);
Router.route('/getTransactions/:id').get(
  authController.autheticateUser,
  accountController.getTransactionsById
);

Router.route('/getAllTrasactions').get(accountController.getAllTransactions);

module.exports = Router;
