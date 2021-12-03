const Router = require('express')
const router = new Router()
const {Comment} = require ('../models/models')

router.post('/', async (req, res) => {
	const {text, userId, reviewId} = req.body
	const comment = await Comment.create({text, userId, reviewId})
	return res.json(comment)
})
router.get('/', async (req, res) => {
  let {userId, reviewId} = req.query
  let lcomments
  if (!userId && !reviewId) {
    comments = await Comment.findAll()
  }
  if (userId && !reviewId) {
    comments = await Comment.findAll({where:{userId}})
  }
  if (!userId && reviewId) {
    comments = await Comment.findAll({where:{reviewId}})
  }
  if (!userId && reviewId) {
    comments = await Comment.findOne({where:{reviewId, userId}})
  }
  return res.json(comments)
})
// router.get('/', async (req, res) => {
// 	const {userId, reviewId} = req.query
// 	const comment = await Comment.findOne({where:{reviewId, userId}})
// 	return res.json(comment)
// })
// router.get('/', async (req, res) => {
// 	const {reviewId} = req.query
// 	const comments = await Comment.findAll({where:{reviewId}})
// 	return res.json(comments)
// })
// router.get('/', async (req, res) => {
// 	const comments = await Comment.findAll()
// 	return res.json(comments)
// })

module.exports = router 