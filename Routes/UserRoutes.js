const express = require('express')
const passport = require('passport')
const UserRoutes = express.Router()
const UserController = require('./../Controller/User')
UserRoutes.post('/register',UserController.register)
UserRoutes.post('/login', UserController.login)
UserRoutes.use(passport.authenticate('jwt', { session: false }))
UserRoutes.post('/createform', UserController.createForm)
module.exports = UserRoutes