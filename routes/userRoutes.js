const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const Router = express.Router();
Router.route('/signUp').post(authController.signUp, authController.sendOtp);
Router.route('/verifyOtp').post(authController.verifyOtp);
Router.route('/login').post(authController.login);
Router.route('/resendOtp').post(authController.resendOtp);
// Router.route('/getTag').post(
//   authController.autheticateUser,
//   accountController.getTag
// );
Router.route('/getMe').get(
  authController.autheticateUser,
  userController.getMe
);

Router.route('/logout').get(authController.logout);
Router.route('/updateUser').patch(
  authController.autheticateUser,
  userController.updateMe
);

Router.route('/deleteUser').delete(
  authController.autheticateUser,
  userController.deleteUser
);

Router.route('/searchEmail').post(userController.searchEmail);
// Router.route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

Router.route('/').get(userController.getAllUsers);

module.exports = Router;
