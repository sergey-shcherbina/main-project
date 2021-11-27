const Router = require('express')
const router = new Router()
const {Review} = require ('../models/models')

router.post('/', async (req, res) => {
	const {name, text, authorRate, groupId, userId} = req.body
	const review = await Review.create({name, text, authorRate, groupId, userId})
	return res.json(review)
})
router.get('/', async (req, res) => {
	let {groupId, userId} = req.query //, limit, page
  //page = page || 1
  //limit = limit || 9
  //let offset = page * limit - limit
  let reviews
  if (!groupId && !userId) {
    reviews = await Review.findAll() //AndCount {limit, offset}
  }
  if (groupId && !userId) {
    reviews = await Review.findAll({where:{groupId}})
  }
  if (!groupId && userId) {
    reviews = await Review.findAll({where:{userId}})
  }
  if (groupId && userId) {
    reviews = await Review.findAll({where:{userId, groupId}})
  }
  return res.json(reviews)
})
router.get('/:id', async (req, res) => {
	const {id} = req.params
	const review = await Review.findOne({where: {id}})  //,include: [{model: Comment, as: 'comment'}]
	return res.json(review)
})
router.put('/:id', async (req, res) => {
	const {id} = req.params
	const {name, text, authorRate, groupId} = req.body
	const review = await Review.findOne({where: {id}})
	await review.update({name, text, authorRate, groupId})
	return res.json(review)
})
router.delete('/:id', async (req, res) => {
	const {id} = req.params
	await Review.destroy({where: {id}})
})

module.exports = router


