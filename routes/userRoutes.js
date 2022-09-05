const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const accountController = require('../controllers/accountController');

const Router = express.Router();
Router.route('/signUp').post(authController.signUp, authController.sendOtp);
Router.route('/verifyOtp').post(authController.verifyOtp);
Router.route('/login').post(authController.login);
Router.route('/resendOtp').post(authController.resendOtp);
Router.route('/getTag').post(
  authController.autheticateUser,
  accountController.getTag
);
Router.route('/getMe').get(
  authController.autheticateUser,
  userController.getMe
);
Router.route('/:id')
  .get(userController.getUser)
  .post(userController.updateUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

Router.route('/').get(userController.getAllUsers);

module.exports = Router;
