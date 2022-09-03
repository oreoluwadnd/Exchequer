const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const Router = express.Router();
Router.route('/signUp').post(authController.signUp, authController.sendOtp);
Router.route('/verifyOtp').post(authController.verifyOtp);
Router.route('/login').post(authController.login);

Router.route('/').get(userController.getAllUsers);

module.exports = Router;
