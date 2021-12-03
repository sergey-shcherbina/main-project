const Router = require('express')
const router = new Router()
const {ReviewTag} = require ('../models/models')

router.post('/', async (req, res) => {
	const {tagId, reviewId} = req.body
	const review = await ReviewTag.create({tagId, reviewId})
	return res.json(review)
})