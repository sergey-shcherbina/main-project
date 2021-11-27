const Router = require('express')
const router = new Router()
const {Tag} = require ('../models/models')

router.post('/', async (req, res) => {
	const {word} = req.body
  const tag = await Tag.create({word})
  return res.json(tag)
})
router.get('/', async (req, res) => {
	const tags = await Tag.findAll()
	return res.json(tags)
})
router.get('/', async (req, res) => {
	const {id} = req.params
	const tag = await Tag.findOne({where: {id}}) 
	return res.json(tag)
})	

module.exports = router