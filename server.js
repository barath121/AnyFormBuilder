const app = require('./Config/app')

const port = process.env.PORT || 3000
app.listen(port , ()=>{
	console.log(`App running on port http://localhost:${port}`)
})