const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
app.use(morgan('tiny'))
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
		fileSize: 100 * 1024 * 1024 
	}
})
const cookieParser = require('cookie-parser')
app.use(express.static(path.join(__dirname,'../Web/dist')))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(upload.any())
/*Auth*/
const passport = require('passport')
const  session  = require('express-session')
require('./passport')
app.use(session({
	secret : process.env.SESSIONSECRET,
	resave : false,
	saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())
/*Excel Middleware*/
var json2xls = require('json2xls')
app.use(json2xls.middleware)
/*Initilize Routes */
require('./../Routes/RoutesSetup')(app)
app.use('*',function(req,res){
	res.sendFile(path.join(__dirname,'../Web/dist/index.html'))
})









module.exports = app