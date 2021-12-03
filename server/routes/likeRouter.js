const Router = require('express')
const router = new Router()
const {Like} = require ('../models/models')

router.post('/', async (req, res) => {
	const {userId, reviewId} = req.body
	const like = await Like.create({userId, reviewId})
  	return res.json(like)
})
router.get('/', async (req, res) => {
	let {userId, reviewId} = req.query
  let likes
  if (!userId && !reviewId) {
    likes = await Like.findAll()
  }
  if (userId && !reviewId) {
    likes = await Like.findAll({where:{userId}})
  }
  if (!userId && reviewId) {
    likes = await Like.findAll({where:{reviewId}})
  }
  if (userId && reviewId) {
    likes = await Like.findOne({where:{reviewId, userId}})
  }
  return res.json(likes)
})

module.exports = router