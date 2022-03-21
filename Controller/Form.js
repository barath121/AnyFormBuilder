
const Form = require('./../Models/Form.js')
const catchAsync = require('./../Utils/catchAsync')
module.exports.createForm = catchAsync(async (req, res, next) => {
	let formData = req.body
	formData.createdBy = req.user._id
	await Form.create(formData)
	res.status(201).json({
		message: 'Form Created Sucessfully'
	})
})
module.exports.updateForm = catchAsync(async (req, res, next) => {
	let formData = req.body;
	let formToBeUpdated = await Form.findById(formData._id);
	if (!formToBeUpdated) {
		res.status(200).json({
			message: 'Form Doesn`t Exists'
		})
	}
	else if (formToBeUpdated.createdBy.equals(req.user._id)) {
		await Form.findByIdAndUpdate(formData._id, formData);
		res.status(200).json({
			message: 'Form Updated Sucessfully'
		})
	}
	else {
		res.status(405).json({
			message: 'You Dont Have Permission To Delete The Form'
		})
	}
})

module.exports.deleteForm = catchAsync(async (req, res, next) => {
	let formData = req.body;
	let formToBeDeleted = await Form.findById(formData._id);
	if (!formToBeDeleted) {
		res.status(200).json({
			message: 'Form Doesn`t Exists'
		})
	}
	else if (formToBeDeleted.createdBy.equals(req.user._id)) {
		await Form.findByIdAndDelete(formData._id);
		res.status(200).json({
			message: 'Form Deleted Sucessfully'
		})
	}
	else {
		res.status(405).json({
			message: 'You Dont Have Permission To Delete The Form'
		})
	}
})
module.exports.getAllUserForms = catchAsync(async(req,res,next)=>{
	let sortBy;
	let aggregationSteps = [];
	if(req.query.title){
		aggregationSteps.push(
			{
				$search: {
					index: 'formsTitle',
					autocomplete: {
						query: `${req.query.title}`,
						path: "title",
						fuzzy: {
							maxEdits: 2,
							prefixLength: 3,
						},
					},
				}
			}
		)
	}
	aggregationSteps.push({
		$match :{
			createdBy : req.user._id
		}
	})
	if(req.query.sortBy=="createdAt"){
		sortBy = {"createdAt" : -1}
	}else if(req.query.sortBy=="title"){
		sortBy = {"title" : 1}
	}else{
		sortBy = {"updatedAt" : -1}
	}
	aggregationSteps.push({
		$sort : sortBy
	})
	let userForms = await Form.aggregate(
			aggregationSteps
	)
	console.log(userForms)
	if(userForms.length)
	res.status(200).json({
		message: 'The User Forms are',
		userForms
	})
	else
	res.status(200).json({
		message: 'The User Has No Forms',
		userForms
	})
})
module.exports.getFormPages = catchAsync(async(req,res,next) =>{
	let formID = req.params.id;
	let formData = await Form.findById(formID).select("title savedPages");
	if(formData){
		res.status(200).json({
			message: 'The Form Pages are',
			formData
		})
	}else{
		res.status(200).json({
			message: 'The Form does not exists',
		})
	}
})
module.exports.getPublishedPages = catchAsync(async(req,res,next) =>{
	let formID = req.params.id;
	let formData = await Form.findById(formID).select("title publishedPages");
	if(formData){
		res.status(200).json({
			message: 'The Form Pages are',
			formData
		})
	}else{
		res.status(200).json({
			message: 'The Form does not exists',
		})
	}
})

module.exports.saveFormResponse = catchAsync(async(req,res,next)=>{
	console.log(req.files)
	console.log(req.body)
	res.status(200)
})