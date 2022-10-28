const express = require('express');
const HomeController = require('../controllers/HomeController');

const Router = express.Router();

Router.route('/').get(HomeController.getHome);
