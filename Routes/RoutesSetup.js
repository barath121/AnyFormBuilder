const UserRoutes = require('./User.js')
const FormRoutes = require('./Form.js')
const ErrorHandler = require('./../Utils/ErrorHandler')
const wwwRedirect= (req, res, next) =>{
	if (req.headers.host.slice(0, 4) === 'www.') {
		var newHost = req.headers.host.slice(4)
		return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl)
	}
	next()
}
const Routesinit = (app) => {
	/*Make Request Body Avaliable to Frontend */
	app.use((req, res, next) => {
		res.locals.req = req
		next()
	})
	//Redirect to Non WWW website if Starts with WWW
	app.use(wwwRedirect)
	app.use('/user',UserRoutes)
	app.use('/form',FormRoutes)
	app.use(ErrorHandler.PageNotFoundHandler)
	app.use(ErrorHandler.ErrorHandler)
}
module.exports = Routesinit