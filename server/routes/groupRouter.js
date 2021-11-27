const Router = require('express')
const router = new Router()
const {Group} = require ('../models/models')

router.post('/', async (req, res) => {
	const {name} = req.body
  const group = await Group.create({name})
  return res.json(group)
})
router.get('/', async (req, res) => {
	const groups = await Group.findAll()
  return res.json(groups)
})

module.exports = router 