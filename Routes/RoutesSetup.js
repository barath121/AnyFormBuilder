const UserRoutes = require('./User.js')
const FormRoutes = require('./Form.js')
const ErrorHandler = require('./../Utils/ErrorHandler')
const express = require('express')

const wwwRedirect= (req, res, next) =>{
	if (req.headers.host.slice(0, 4) === 'www.') {
		var newHost = req.headers.host.slice(4)
		return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl)
	}
	next()
}
const Routesinit = (app) => {
	/*Make Request Body Avaliable to Frontend */
	const apiRouter = express.Router()
	
	apiRouter.use((req, res, next) => {
		res.locals.req = req
		next()
	})
	//Redirect to Non WWW website if Starts with WWW
	apiRouter.use(wwwRedirect)
	apiRouter.use('/user',UserRoutes)
	apiRouter.use('/form',FormRoutes)
	apiRouter.use(ErrorHandler.PageNotFoundHandler)
	apiRouter.use(ErrorHandler.ErrorHandler)

	app.use('/api',apiRouter)
}
module.exports = Routesinit