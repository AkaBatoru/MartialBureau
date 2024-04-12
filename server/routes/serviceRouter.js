const Router = require('express')
const router = new Router()
const serviceController = require('../controllers/serviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', serviceController.create)
router.get('/', serviceController.getAll)
router.get('/:ID_Service', serviceController.getOne)
router.patch('/:ID_Service', serviceController.update)
router.delete('/:ID_Service', serviceController.delete)

module.exports = router