const Router = require('express')
const router = new Router()
const userController = require('../controllers/userContoller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.delete('/', userController.delete)

module.exports = router