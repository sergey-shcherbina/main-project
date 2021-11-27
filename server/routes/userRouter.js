const Router = require('express')
const router = new Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require ('../models/models')

const generateJwt = (id, email, role) => {
	return jwt.sign(
		{id, email, role},
		process.env.SECRET_KEY,
		{expiresIn: '2h'}  
	)
}

//userController.registration
router.post('/registration', async (req, res) => {  //(req, res, next)
	const {email, password, role} = req.body
  if (!email || !password) {
    return res.status(404).json({message: 'Некорректный email или password'})  //next(ApiError.badRequest('Некорректный email или password'))Not correct email or password
  }
	const candidate = await User.findOne({where: {email}})
	if (candidate) {
		return res.status(404).json({message: 'Пользователь с таким email уже существует'})	//next(ApiError.badRequest('Пользователь с таким email уже существует'))
			//return next(res.status(404).json({message: 'Пользователь с таким email уже существует'}))
	}
	const hashPassword = await bcrypt.hash(password, 5)
	const user = await User.create({email, role, password: hashPassword})
		//const userPage =   //const basket = await Basket.create({userId: user.id})
	const token = generateJwt(user.id, user.email, user.role)

		// const token = jwt.sign(
		// 	{id: user.id, email: user.email, role: user.role}, //{id, email, role}
		// 	process.env.SECRET_KEY,
		// 	{expiresIn: '24h'}
		// ) 

	return res.json({token})     //return res.json({token: token})  
})        
//userController.login
router.post('/login', async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({where: {email}})
  if (!user) {
    return res.status(404).json({message: 'Пользователь не найден'})
  }
  let comparePassword = bcrypt.compareSync(password, user.password)
  if (!comparePassword) {
    return res.status(404).json({message: 'Указан неверный пароль'})
  }
  const token = generateJwt(user.id, user.email, user.role)
  return res.json({token})
  
}) 

//authMiddleware, userController.check                 
router.get('/auth', 
  (req, res, next) => {    
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
      if (!token) {
        return res.status(401).json({message: "Пользователь не авторизован"})
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      req.user = decoded
      next()
    } catch (err) {
      res.status(401).json({message: "Пользователь не авторизован"})
    }	
  },
  async (req, res) =>  {
	  const token = generateJwt(req.user.id, req.user.email, req.user.role)
	  return res.json({token})
  }
) 

//checkRoleMiddleware

// router.get('/auth/admin',
//     (req, res, next) => {
//       if (req.method === "OPTIONS") {
//           next()
//       }
//       try {
//           const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
//           if (!token) {
//               return res.status(401).json({message: "Не авторизован"})
//           }
//           const decoded = jwt.verify(token, process.env.SECRET_KEY)
//           if (decoded.role !== role) {
//               return res.status(403).json({message: "Нет доступа"})
//           }
//           req.user = decoded;
//           next()
//       } catch (err) {
//           res.status(401).json({message: "Не авторизован"})
//       }
//     }  
//   } 
// )

module.exports = router

