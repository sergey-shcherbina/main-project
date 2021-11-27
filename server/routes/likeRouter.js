const Router = require('express')
const router = new Router()
const {Like} = require ('../models/models')

router.post('/', async (req, res) => {
	const {userId, reviewId} = req.body
	const like = await Like.create({userId, reviewId})
  return res.json(like)
})
router.get('/', async (req, res) => {
	const {userId, reviewId} = req.query
	const likes = await Image.findAll({where:{reviewId, userId}})
	return res.json(likes)
})

module.exports = router