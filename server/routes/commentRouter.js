const Router = require('express')
const router = new Router()
const {Comment} = require ('../models/models')

router.post('/', async (req, res) => {
	const {text, userId, reviewId} = req.body
	const comment = await Comment.create({text, userId, reviewId})
	return res.json(comment)
})
router.get('/', async (req, res) => {
	const {userId, reviewId} = req.query
	const comments = await Rate.findAll({where:{reviewId, userId}})
	return res.json(comments)
})

module.exports = router 