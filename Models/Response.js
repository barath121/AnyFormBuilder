const mongoose = require('mongoose')
const responseSchema = mongoose.Schema({
	response : {
		type : String,
		required : true
	},
	formID : {
		type : mongoose.Types.ObjectId,
		required : true,
		ref : 'Form'
	},
	fileFolder : {
		type : String,
		required : true
	}
},{
	timestamps: { createdAt: true, updatedAt: false },
})

const Response = mongoose.model('Response',responseSchema)
module.exports = Response