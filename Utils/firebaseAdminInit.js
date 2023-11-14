const Cloud = require('@google-cloud/storage')
const path = require('path')
const util = require('util')
const { format } = util
const { Storage } = Cloud
const { v4: uuidv4 } = require('uuid')

let serviceKey = path.join(__dirname, './Firebase/keys.json')
let storage = new Storage({
	keyFilename: serviceKey,
	projectId: process.env.FBProjectId,
})
let gc = storage
let bucket = gc.bucket(process.env.BUCKETNAME)
let fburl = process.env.FirebaseURL

module.exports.uploadFile = (file,imageid) => new Promise((resolve, reject) => {
	const { originalname, buffer ,fieldname} = file
	let fileType = originalname.split('.')
	fileType = '.' + fileType[fileType.length-1]
	const blob = bucket.file(imageid+'/'+fieldname+'/'+uuidv4() + fileType)
	const blobStream = blob.createWriteStream({
		resumable: false
	})
	blobStream.on('finish', () => {
		const publicUrl = format(
			`https://storage.googleapis.com/${bucket.name}/${blob.name}`
		)
		resolve(publicUrl)
	})
		.on('error', (err) => {
			reject('Unable to upload image, something went wrong')
		})
		.end(buffer)

})

module.exports.deleteFile = async(images) =>{
	images.forEach(image=>{
		bucket.file(image.split('https://storage.googleapis.com/'+fburl).pop()).delete()
	})
}
