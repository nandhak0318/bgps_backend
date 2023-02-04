const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
   return res.status(400).json({'msg':'Enter a valid authorization token',refreshToken:true})
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    //attach the user to the job routes
    req.user = { userName: payload.userName }
  } catch (err) {
    console.log(err)
    return res.status(400).json({'msg':'token expired',refreshToken:true})
  }
  next()
}

module.exports = auth