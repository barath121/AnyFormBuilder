
const Form = require('./../Models/Form.js')
const Response = require('./../Models/Response.js')
const catchAsync = require('./../Utils/catchAsync.js')
const fileUploader = require('./../Utils/firebaseAdminInit.js')
const { v4: uuidv4 } = require('uuid')

module.exports.createForm = catchAsync(async (req, res, next) => {
	let formData = req.body
	formData.createdBy = req.user._id
	await Form.create(formData)
	res.status(201).json({
		message: 'Form Created Sucessfully'
	})
})
module.exports.updateForm = catchAsync(async (req, res, next) => {
	let formData = req.body
	let formToBeUpdated = await Form.findById(formData._id)
	if (!formToBeUpdated) {
		res.status(200).json({
			message: 'Form Doesn`t Exists'
		})
	}
	else if (formToBeUpdated.createdBy.equals(req.user._id)) {
		await Form.findByIdAndUpdate(formData._id, formData)
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
	let formData = req.body
	let formToBeDeleted = await Form.findById(formData._id)
	if (!formToBeDeleted) {
		res.status(200).json({
			message: 'Form Doesn`t Exists'
		})
	}
	else if (formToBeDeleted.createdBy.equals(req.user._id)) {
		await Form.findByIdAndDelete(formData._id)
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
	let sortBy
	let aggregationSteps = []
	if(req.query.title){
		aggregationSteps.push(
			{
				$search: {
					index: 'formsTitle',
					autocomplete: {
						query: `${req.query.title}`,
						path: 'title',
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
	if(req.query.sortBy=='createdAt'){
		sortBy = {'createdAt' : -1}
	}else if(req.query.sortBy=='title'){
		sortBy = {'title' : 1}
	}else{
		sortBy = {'updatedAt' : -1}
	}
	aggregationSteps.push({
		$sort : sortBy
	})
	let userForms = await Form.aggregate(
		aggregationSteps
	)
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
	let formID = req.params.id
	let formData = await Form.findById(formID).select('title savedPages createdBy')
	if(formData&&formData.createdBy.equals(req.user._id)){
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
	let formID = req.params.id
	let formData = await Form.findById(formID).select('title publishedPages')
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
	let responseObject = {}
	responseObject.fileFolder = uuidv4()
	responseObject.formID = req.body.formID
	let responseData = JSON.parse(JSON.stringify(req.body))
	delete responseData.formID
	await Promise.all(req.files.map(async file=>{
		responseData[file.fieldname] =  await fileUploader.uploadFile(file,responseObject.fileFolder)
	}))
	responseObject.response = Buffer.from(JSON.stringify(responseData)).toString('base64')
	await Response.create(responseObject)
	res.status(200).json({
		message : 'Form Response have been saved'
	})
})

module.exports.getResponsesofForms = catchAsync(async(req,res,next)=>{
	let form = await Form.findById(req.params.id)
	let responses = await Response.find({
		formID : req.params.id
	})
	if(responses.length  == 0 && !form.createdBy.equals(req.user._id))
		res.status(204).json({
			message : 'There are no responses'
		})
	else{
		let responsesArr =await Promise.all(responses.map(async response => {
			return await JSON.parse(Buffer.from(response.response, 'base64').toString('ascii'))
		}))
		let tempObj = {}
		await Promise.all(responsesArr.map(async response=>{
			await Promise.all(Object.keys(response).map(el=>{
				tempObj[el] = ""
			}))	
		}))
		responsesArr.push(tempObj);
		responsesArr = [tempObj,...responsesArr]
		res.xls('responses.xlsx',responsesArr)
	}
})