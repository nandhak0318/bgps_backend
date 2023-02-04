const mongoose = require('mongoose')

const topper = new mongoose.Schema({
  name: String,
  image:String,
  precentage:String,
  filePath:String
})

module.exports = mongoose.model('TopperList',topper)