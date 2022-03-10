const handleDuplicateKeyError = (err, res) => {
	const field = Object.keys(err.keyValue)
	const error = `An account with that ${field} already exists.`
	res.status(400).json({message : error})
}
const handleValidationError = (err, res) => {
	let error = Object.values(err.errors).map(el => el.path)
	if(error.length > 1) {
		error = error.join(',')
	}
	res.status(400).json({message : 'Enter valid value for '+error+'.'})
}
module.exports.PageNotFoundHandler = (req, res, next) => {
	const err={}
	err.name = ('Page Not Found')
	err.status = 'fail'
	err.code = 404
	next(err)
}
module.exports.ErrorHandler = (err, req, res ,next) =>{
	if(err.name === 'ValidationError') return err = handleValidationError(err, res)
	else if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res)
	else if(err.code == 404) res.status(404).json({message : ' Page Not Found'})
	else res.status(400).json({message : 'Internal Server Error'})
}