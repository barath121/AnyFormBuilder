const User = require('./../Models/User.js')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const catchAsync = require('./../Utils/catchAsync')
module.exports.register = catchAsync(async(req,res,next) =>{
	let user = req.body
	if(user.password)
	user.password = await bcrypt.hash(req.body.password,parseInt(process.env.Salt))
	let newuser = await User.create(user)
	res.status(201).json({
		message : 'User Created Sucessfully',
		user : newuser
	})
})
module.exports.login = catchAsync(async(req, res, next) => {
	console.log(req.body)
	passport.authenticate('local', { session: false }, (err, user, msg) => {
		if (err) next(err)
		else if (!user) {
			res.status(401).json({
				...msg
			})
		}
		else {
			const token = jwt.sign({ id: user._id.toJSON(), type: user.type }, process.env.jwtKey , {expiresIn : '1d'})
			res.status(200).json({
				message: msg,
				token: token,
				...user._doc
			})
		}
	})(req, res, next)
})
module.exports.isTokenValid = (req,res,next) =>{
	res.status(200).json({
		message : "The token is valid"
	})
}