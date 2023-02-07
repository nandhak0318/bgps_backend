const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.mid')

const { login, createUser } = require('../controllers/auth.controller')

router.post('/api/createUser',auth, createUser)
router.post('/api/login', login)

module.exports = router