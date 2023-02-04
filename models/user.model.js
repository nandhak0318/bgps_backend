const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  userName: {
    type: String
  },
  password: {
    type: String,
  },
})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.createJwt = function () {
  return jwt.sign(
    {userName: this.userName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME },
  )
}

UserSchema.methods.verify = async function (pass) {
  return bcrypt.compare(pass, this.password)
}

module.exports = mongoose.model('User', UserSchema)