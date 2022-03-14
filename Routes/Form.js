const express = require('express')
const passport = require('passport')
const FormRoutes = express.Router()
const FormController = require('../Controller/Form')
FormRoutes.use(passport.authenticate('jwt', { session: false }))
FormRoutes.post('/createform', FormController.createForm)
module.exports = FormRoutes