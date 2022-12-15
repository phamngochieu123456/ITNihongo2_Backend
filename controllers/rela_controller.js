var rela_ctl = module.exports
const rela_model = require("../models/rela_model")


rela_ctl.getList = async (req,res)=>{
  try
  {
    const jsonstr = await rela_model.getList()
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('getList has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}