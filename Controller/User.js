const User = require('./../Models/User.js')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const catchAsync = require('./../Utils/catchAsync')
const mailSender = require('./../Utils/mailSender')
const { v4: uuidv4 } = require('uuid');

module.exports.register = catchAsync(async(req,res,next) =>{
	let user = req.body
	if(user.password)
	user.password = await bcrypt.hash(req.body.password,parseInt(process.env.Salt))
	let newuser = await User.create(user)
	res.status(201).json({
		message : 'User Created Sucessfully',
	})
})
module.exports.login = catchAsync(async(req, res, next) => {
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
module.exports.forgotPassword = catchAsync(async(req,res,next)=>{
	let email = req.body.email;
	let user = await User.findOne({email : email});
	if(user){
		let token = uuidv4()
		await User.findByIdAndUpdate(user.id,{
			forgotPasswordToken : token
		})
		let mail = await mailSender("Reset Your Password",email,`Please Open This Link to Reset Your Password ${process.env.ClientURL + "/resetpassword/" + token}`);
		res.status(200).json({
			message : "Please check your email to reset password"
		})
	}else{
		res.status(304).json({
			message : "Please Enter a Valid Email"
		})
	}
})
module.exports.resetPasswordFromForgotPassword = catchAsync(async(req,res,next)=>{
	let {token,password} = req.body;
	password = await bcrypt.hash(req.body.password,parseInt(process.env.Salt));
	let user = await User.findOne({forgotPasswordToken : token});
	if(user){
		await User.findByIdAndUpdate(user.id,{
			forgotPasswordToken : "",
			password : password
		})
		res.status(200).json({
			message : "Password Has Been Changed"
		})
	}else{
		res.status(304).json({
			message : "Your Token is Invalid.Please reset Your Password again"
		})
	}
})
module.exports.isTokenValid = (req,res,next) =>{
	res.status(200).json({
		message : "The token is valid"
	})
}