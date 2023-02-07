const GlobalSettings = require('../models/global.model')

const getString = async(req,res)=>{
  try {
    const {headerString} = await GlobalSettings.findOne({settingType:"default"})
    res.status(200).json({headerString})
  } catch (e) {
    console.log(e.message)
    res.status(500).json({msg:'internal server error'})
  }
}

const updateHeaderString = async (req,res)=>{
  try {
    let tempHs
    const {headerString} = req.body
    const settings = await GlobalSettings.findOneAndUpdate({settingType:"default"},{headerString},{new:true})
    tempHs = settings
    if(!settings){
      tempHs = await GlobalSettings.create({headerString:headerString})
    }
    let hs = tempHs.headerString
    res.status(200).json({msg:'sucessfully updated',headerString:hs})
  } catch (e) {
    console.log(e.message)
    res.status(500).json({msg:'internal server error'})
  }
}

module.exports = {
  updateHeaderString,getString
}