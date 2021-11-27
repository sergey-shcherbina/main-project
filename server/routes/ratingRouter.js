const Router = require('express')
const router = new Router()
const {Rating} = require ('../models/models')

router.post('/', async (req, res) => {
	const {rate, userId, reviewId} = req.body
	const rating = await Like.create({rate, userId, reviewId})
  return res.json(rating)
})
router.get('/', async (req, res) => {
	const {userId, reviewId} = req.query
	const ratings = await Rate.findAll({where:{reviewId, userId}})
	return res.json(ratings)
})

module.exports = router