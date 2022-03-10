const User = require('./../Models/User.js')
const Form = require('./../Models/Form.js')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const catchAsync = require('./../Utils/catchAsync')
module.exports.register = catchAsync(async(req,res,next) =>{
	let user = req.body
	user.password = await bcrypt.hash(req.body.password,parseInt(process.env.Salt))
	let newuser = await User.create(user)
	res.status(201).json({
		message : 'User Created Sucessfully',
		user : newuser
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

module.exports.createForm = catchAsync(async(req,res,next)=>{
	let formData = req.body
	formData.createdBy = req.user._id
	await Form.create(formData)
	res.status(201).json({
		message : 'Form Created Sucessfully'
	})
})

module.exports.addPageToForm = catchAsync(async(req,res,next)=>{
	let pageData = req.body;
	let formId = req.body.formID;
	let addedPage = await Form.findByIdAndUpdate(formId,{pages : {$push : pageData}});
	// if(addedPage)
	// res
})