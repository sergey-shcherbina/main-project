const Router = require('express')
const router = new Router()
const {Tag} = require ('../models/models')

router.post('/', async (req, res) => {
const {word, reviewId} = req.body
  const tag = await Tag.create({word, reviewId})
  return res.json(tag)
})
router.get('/', async (req, res) => {
  let {reviewId} = req.query
  let tags
  if (!reviewId) {
	  tags = await Tag.findAll()
  }
  if (reviewId) {
    tags = await Tag.findAll({where:{reviewId}})
  }
	return res.json(tags)
})	

module.exports = router