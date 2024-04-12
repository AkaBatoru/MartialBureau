const Router = require('express')
const router = new Router()
const orderRouter = require('./orderRouter')
const serviceRouter = require('./serviceRouter')
const userRouter = require('./userRouter')
const fileRouter = require('./fileRouter')


router.use('/order', orderRouter)
router.use('/service', serviceRouter)
router.use('/user', userRouter)
router.use('/file', fileRouter)


module.exports = router
