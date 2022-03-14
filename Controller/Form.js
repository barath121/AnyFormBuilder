
const Form = require('./../Models/Form.js')
const catchAsync = require('./../Utils/catchAsync')

module.exports.createForm = catchAsync(async(req,res,next)=>{
	let formData = req.body
	formData.createdBy = req.user._id
	await Form.create(formData)
	res.status(201).json({
		message : 'Form Created Sucessfully'
	})
})

module.exports.updateForm = catchAsync(async(req,res,next)=>{
	let pageData = req.body;
	

})