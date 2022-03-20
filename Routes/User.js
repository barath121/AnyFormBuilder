const express = require('express');
const UserRoutes = express.Router();
const passport = require('passport');
const UserController = require('../Controller/User');
UserRoutes.post('/register',UserController.register)
UserRoutes.post('/login', UserController.login)
UserRoutes.post('/forgotpassword',UserController.forgotPassword);
UserRoutes.post('/changepassword',UserController.resetPasswordFromForgotPassword);
UserRoutes.use(passport.authenticate('jwt', { session: false }));
UserRoutes.get('/istokenvalid',UserController.isTokenValid);
module.exports = UserRoutes