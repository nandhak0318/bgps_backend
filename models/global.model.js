const mongoose = require('mongoose')

const globalSetting = new mongoose.Schema({
  headerString: {
    type:String,
    default:"empty"
  },
  settingType:{
    type:String,
    default:"default"
  }
})

module.exports = mongoose.model('GlobalSettings',globalSetting)