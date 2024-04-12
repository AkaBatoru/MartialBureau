const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')

router.get('/download', typeController.downloadFile)

module.exports = router