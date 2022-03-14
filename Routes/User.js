const express = require('express')
const UserRoutes = express.Router()
const UserController = require('../Controller/User')
UserRoutes.post('/register',UserController.register)
UserRoutes.post('/login', UserController.login)

module.exports = UserRoutes