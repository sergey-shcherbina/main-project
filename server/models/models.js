const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"}
})
const Review = sequelize.define('review', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  text: {type: DataTypes.TEXT, allowNull: false},
  authorRate: {type: DataTypes.INTEGER, allowNull: false},
})
const Rating = sequelize.define('rating', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false}
})
const Group = sequelize.define('group', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const Comment = sequelize.define('comment', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.TEXT, allowNull: false} 
})
const Like = sequelize.define('like', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const Tag = sequelize.define('tag', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	word: {type: DataTypes.STRING, allowNull: false}
})
const Image = sequelize.define('image', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	order: {type: DataTypes.INTEGER, allowNull: false},
	link: {type: DataTypes.STRING, allowNull: false}
})
const ReviwTag = sequelize.define('review_tag', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})



User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Like)
Like.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Group.hasMany(Review)
Review.belongsTo(Group)

Review.hasMany(Rating)
Rating.belongsTo(Review)

Review.hasMany(Comment)
Comment.belongsTo(Review)

Review.hasMany(Like)
Like.belongsTo(Review)

Review.hasMany(Image)
Image.belongsTo(Review)

Review.belongsToMany(Tag, {through: ReviwTag })
Tag.belongsToMany(Review, {through: ReviwTag })


module.exports = {
  User,
  Review,
  Group,
  Rating,
  Comment,
  Like,
	Image,
	Tag	
}
