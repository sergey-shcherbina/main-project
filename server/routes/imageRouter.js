const Router = require('express')
const router = new Router()
const {Image} = require ('../models/models')
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")

//const uuid = require('uuid')
//const path = require('path')
router.get('/imagetest', async (req, res) => {
	console.log(process.env)
	const client = new S3Client({region: "eu-central-1"})

	// TO DELETE 
	var file = "/Users/nataliashcherbina/Downloads/preview.jpg"
	var fs = require('fs');
	var fileStream = fs.createReadStream(file);
	fileStream.on('error', function(err) {
	console.log('File Error', err);
	});

	// END DELETE 
	
	const command = new PutObjectCommand({Bucket: "picturesformainproject", Key:"test1", Body:fileStream});
	const response = await client.send(command);
	return res.json(response)
})

/*router.post('/', async (req, res) => {
	//const {order, link} = req.files
	//let fileName = uuid.v4() + ".jpg"
  //img.mv(path.resolve(__dirname, '..', 'static', fileName))
	const {order, link, reviewId} = req.body
	const image = await Image.create({order, link, reviewId})
  return res.json(image)
})
router.get('/', async (req, res) => {
	const {reviewId} = req.query
	const images = await Image.findAll({where:{reviewId}})
	return res.json(images)
})
router.get('/:id', async (req, res) => {
	const {id} = req.params
	const image = await Review.findOne({where: {id}}) 
	return res.json(image)
})
router.delete('/:id', async (req, res) => {
	const {id} = req.params
	await Image.destroy({where: {id}})
})*/

module.exports = router