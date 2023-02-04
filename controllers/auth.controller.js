const User = require('../models/user.model')

const createUser = async (req, res) => {
  const { userName, password } = req.body
  if (!userName || !password) {
    return res.status(400).json({msg:'username or password missing'})
  }
  const tempUser = { userName,password }
  const user = await User.create({ ...tempUser })
  const token = user.createJwt()
  res.status(201).json({ user: { userName: user.userName }, token })
}

const login = async (req, res) => {
  const { userName, password } = req.body
  if (!userName || !password) {
   return res.status(400).json({msg:'please provide email and password'})
  }
  const user = await User.findOne({ userName:userName })
  if (!user) {
    return res.status(400).json({msg:`username doesn't exist`})
  }
  const verify = await user.verify(password)
  if (!verify) {
    return res.status(400).json({'msg':'incorrect password'})
  }
  const token = user.createJwt()
  res.json({ user: { userName: user.userName }, token })
}

module.exports = {
  createUser,
  login,
}