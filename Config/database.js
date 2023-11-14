const mongoose = require('mongoose')
const DatabaseSetup = () => {
	const DBstring = 
	process.env.DATABASE_URI
		.replace('<USERNAME>', process.env.DATABASE_USERNAME)
		.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
	mongoose.connect(DBstring)
		.then(() => {
			console.log('Connection to database sucessful')
		})
		.catch(err => {
			console.log('Connection Failed ' + err)
		})
}
module.exports = DatabaseSetup