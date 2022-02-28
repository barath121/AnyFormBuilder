const User = require('./../Models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const catchAsync = require('./../Utils/catchAsync')
module.exports.Register = catchAsync(async(req,res) =>{
	let user = req.body
	user.password = await bcrypt.hash(req.body.password,parseInt(process.env.Salt))
	let newuser = await User.create(user)
	res.status(201).json({
		message : 'User Created Sucessfully',
		user : newuser
	})
})
module.exports.Login = catchAsync((req, res, next) => {
	passport.authenticate('local', { session: false }, (err, user, msg) => {
		if (err) next(err)
		else if (!user) {
			res.status(401).json({
				...msg
			})
		}
		else {
			const token = jwt.sign({ id: user._id.toJSON(), type: user.type }, process.env.jwtKey)
			res.status(200).json({
				message: msg,
				token: token,
				...user._doc
			})
		}
	})(req, res, next)
})