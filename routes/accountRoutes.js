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

module.exports = Router;
