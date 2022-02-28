const express = require('express')
const UserRoutes = express.Router()
const UserController = require('./../Controller/User')
UserRoutes.post('/register',UserController.Register)
UserRoutes.post('/login', UserController.Login)

module.exports = UserRoutes