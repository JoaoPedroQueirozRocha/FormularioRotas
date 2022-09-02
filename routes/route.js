const express = require('express')
const app = express()
const router = express.Router()
const controller = require('../controller/controller')

router.get('/', controller.RespostaHTML)
router.get('/users', controller.PesquisarContato)

module.exports = router