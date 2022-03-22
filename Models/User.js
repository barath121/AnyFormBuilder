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
	password : {
		type : String,
		required : true
	},
	profilePic : {
		type : String
	},
	forgotPasswordToken :{
		type :String
	},
	isVerified : {
		type : Boolean,
		required : true,
		default : false
	},
	deleteIfNotVerifiedBy : {
		type : Date,
	},
	verificationToken : {
		type : String
	}
},{
	timestamps: { createdAt: true, updatedAt: false },
})
userSchema.index({ deleteIfNotVerifiedBy: 1 }, { expireAfterSeconds: 660 })
const User = mongoose.model('User',userSchema)
module.exports = User