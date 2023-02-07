const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.mid')

const { updateHeaderString,getString } = require('../controllers/string.controller')

router.get('/api/headerString',getString)
router.patch('/api/headerString',auth, updateHeaderString)

module.exports = router