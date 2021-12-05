require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')


const PORT = process.env.PORT || 5000

const app = express() 
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/user', require('./routes/userRouter'))
//app.use('/admin', require('./routes/adminRouter'))
app.use('/group', require('./routes/groupRouter'))
app.use('/review', require('./routes/reviewRouter'))
app.use('/comment', require('./routes/commentRouter'))
app.use('/rating', require('./routes/ratingRouter'))
app.use('/like', require('./routes/likeRouter'))
app.use('/tag', require('./routes/tagRouter'))
app.use('/image', require('./routes/imageRouter'))
 
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (err) {
        console.log(err)
    }
}
start()