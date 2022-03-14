const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
	username : {
		type : String,
		required : true,
		unique : true,
		trim: true
	},
	email : {
		type : String,
		required : true,
		unique : true,
		lowercase: true, 
		trim: true,
		match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	//add password validation before release
	password : {
		type : String,
		required : true
	},
	profilePic : {
		type : String
	}
},{
	timestamps: { createdAt: true, updatedAt: false },
})

const User = mongoose.model('User',userSchema)
module.exports = User