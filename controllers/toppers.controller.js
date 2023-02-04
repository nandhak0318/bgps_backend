const Topper = require('../models/toppers.model')
const { unlink } = require('node:fs')


const getAllToppers = async(req,res)=>{
  try {
    const toppers = await Topper.find({}).sort({precenage:-1,name:1})
    res.status(200).json(toppers)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ msg: 'internal server error' })
  }
}

const AddTopper = async (req, res) => {
  try {
    let {name,percentage} = req.body
    let image = req.files.image
    let fileName = Date.now()
    let orgName = image.name
    orgName = orgName.split('.')
    let ext = orgName[orgName.length - 1]
    let uploadPath = __dirname + "/../public/images/" + fileName + '.' + ext
    let ServerPath = "/images/" + fileName + '.' + ext
    let eror
    image.mv(uploadPath, function (err) {
      if (err) eror = err
    })
    if(eror){
     return res.status(500).json({msg:'something went wrong while uploading image'});
    }

    const topper = await Topper.create({
      image:ServerPath,
      name:name,
      precentage:percentage,
      filePath:uploadPath
    })
    res.status(200).json({msg:'student added successfully',topper})
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ msg: 'internal server error' })
  }
}

const RemoveTopper = async(req,res)=>{
  try {
    const {id} = req.params
    const topper = await Topper.findOneAndDelete({_id:id})
    unlink(topper.filePath, (err) => {})
    res.status(200).json({msg:'student removed successfully',topper})
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ msg: 'internal server error' })
  }
}

module.exports={
  AddTopper,RemoveTopper,getAllToppers
}