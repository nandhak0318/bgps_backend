const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.mid')

const {AddTopper,RemoveTopper,getAllToppers} = require('../controllers/toppers.controller')

router.get('/topper',getAllToppers)
router.delete('/topper/:id',auth, RemoveTopper)
router.post('/topper',auth,AddTopper)

module.exports = router