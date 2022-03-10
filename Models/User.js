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
	phone : {
		type : Number,
		required : true,
		unique : true,
		validate: {
			validator: function(v) {
				//eslint-disable-next-line
				return /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(v)
			},
		}
	},
	name : {
		type : String,
		required : true,
		trim: true
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