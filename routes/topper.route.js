const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.mid')

const {AddTopper,RemoveTopper,getAllToppers} = require('../controllers/toppers.controller')

router.get('/api/topper',getAllToppers)
router.delete('/api/topper/:id',auth, RemoveTopper)
router.post('/api/topper',auth,AddTopper)

module.exports = router