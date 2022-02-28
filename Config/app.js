const express = require('express')
const app = express()
require('dotenv').config({ path: './.env' })
var cors = require('cors')
/* CORS */
app.use(cors({
	origin : '*'
}))
/*Initilize Database */

require('./database')()

/*Form Parsing */
const multer = require('multer')
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
	}
})
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(upload.any())
/*Auth*/
const passport = require('passport')
const  session  = require('express-session')
require('./passport')
app.use(session({
	secret : process.env.sessionsecret,
	resave : false,
	saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())
/*Initilize Routes */
require('./../Routes/RoutesSetup')(app)









module.exports = app