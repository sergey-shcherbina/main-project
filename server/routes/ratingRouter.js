const Router = require('express')
const router = new Router()
const {Rating} = require ('../models/models')

router.post('/', async (req, res) => {
	const {rate, userId, reviewId} = req.body
	const rating = await Rating.create({rate, userId, reviewId})
  return res.json(rating)
})
router.get('/', async (req, res) => {
	let {userId, reviewId} = req.query
  let ratings
  if (!userId && !reviewId) {
    ratings = await Rating.findAll()
  }
  if (userId && !reviewId) {
    ratings = await Rating.findAll({where:{userId}})
  }
  if (!userId && reviewId) {
    ratings = await Rating.findAll({where:{reviewId}})
  }
  if (userId && reviewId) {
    ratings = await Rating.findOne({where:{reviewId, userId}})
  }
  return res.json(ratings)
})

module.exports = router