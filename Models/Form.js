const mongoose = require('mongoose')
const formSchema = mongoose.Schema({
	title : {
		type : String,
		required : true,
		trim : true
	},
	savedPages : [
		{
			fieldName :{
				type : String,
				required : true
			},
			pageType :{
				type : String,
				enum : ['Statement','Small Text','Large Text','Check Box','Radio Button','Date','File'],
				required : true
			},
			question : {
				type : String,
				required : true,
				trim : function(){return(this.pageType != 'Statement')}
			},
			choices : {
				type :[String],
				required : function(){return(this.pageType == 'Check Box'||this.pageType == 'Radio Button')}
			},
			isRequired : {
				type : Boolean,
				required : true,
				default : false
			},
			regex : {
				type : String,
			},
			maxCharacters : {
				type : Number
			}
		}
	],
	publishedPages : [
		{
			fieldName :{
				type : String,
				required : true
			},
			pageType :{
				type : String,
				enum : ['Statement','Small Text','Large Text','Check Box','Radio Button','Date','File'],
				required : true
			},
			question : {
				type : String,
				required : true,
				trim : function(){return(this.pageType != 'Statement')}
			},
			choices : {
				type :[String],
				required : function(){return(this.pageType == 'Check Box'||this.pageType == 'Radio Button')}
			},
			isRequired : {
				type : Boolean,
				required : true,
				default : false
			},
			regex : {
				type : String,
			},
			maxCharacters : {
				type : Number
			}
		}
	],
	createdBy : {
		type : mongoose.Types.ObjectId,
		required : true,
		ref : "User"
	}
},{
	timestamps: true,
})

const Form = mongoose.model('Form',formSchema)
module.exports = Form