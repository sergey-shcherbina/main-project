const Router = require('express')
const router = new Router()
const {Image, Review} = require ('../models/models')
const path = require('path')
// const uuid = require('uuid')
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")


// router.get('/imagetest', async (req, res) => {
// 	console.log(process.env)
// 	const client = new S3Client({region: "eu-central-1"})

// 	// TO DELETE 
// 	var file = "/Users/nataliashcherbina/Downloads/preview.jpg"
// 	var fs = require('fs');
// 	var fileStream = fs.createReadStream(file);
// 	fileStream.on('error', function(err) {
// 	console.log('File Error', err);
// 	});

// 	// END DELETE 
	
// 	const command = new PutObjectCommand({Bucket: "picturesformainproject", Key:"test1", Body:fileStream});
// 	const response = await client.send(command);
// 	return res.json(response)
// })



router.post('/', async (req, res) => {
	const {order, reviewId} = req.body
  const {img} = req.files
	let fileName = reviewId + order + ".jpg"
  img.mv(path.resolve(__dirname, '..', 'static', fileName))
	const image = await Image.create({order, reviewId, img: fileName})
  return res.json(image)
})
router.get('/', async (req, res) => {
	let {reviewId, order} = req.query
  let images
  if (!reviewId && !order) {
    images = await Image.findAll()
  }
  if (reviewId && !order) {
    images = await Image.findAll({where:{reviewId}})
  }
  if (reviewId && order) {
    images = await Image.findOne({where:{reviewId, order}})
  }
  return res.json(images)
})


// router.get('/:id', async (req, res) => {
// 	const {id} = req.params
// 	const image = await Review.findOne({where: {id}}) 
// 	return res.json(image)
// })
// router.delete('/:id', async (req, res) => {
// 	const {id} = req.params
// 	await Image.destroy({where: {id}})
// })

module.exports = router