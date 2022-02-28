const mongoose = require('mongoose')
const DatabaseSetup = () => {
	let DBstring = ''
	if (process.env.NODE_ENV == 'prod') {
		DBstring = process.env.PROD_DATABASE.replace('<USERNAME>', process.env.PROD_DATABASE_USERNAME).replace('<PASSWORD>', process.env.PROD_DATABASE_PASSWORD)
	}
	else {
		DBstring = process.env.DEV_DATABASE.replace('<USERNAME>', process.env.DEV_DATABASE_USERNAME).replace('<PASSWORD>', process.env.DEV_DATABASE_PASSWORD)
	}
	mongoose.connect(DBstring)
		.then(() => {
			console.log('Connection to database sucessful')
		})
		.catch(err => {
			console.log('Connection Failed ' + err)
		})
}
module.exports = DatabaseSetup