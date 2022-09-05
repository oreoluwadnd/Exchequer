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
