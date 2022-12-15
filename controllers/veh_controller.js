var veh_ctl = module.exports
const veh_model = require("../models/veh_model")


veh_ctl.getAllVeh = async (req,res)=>{
  try
  {
    const jsonstr = await veh_model.getAllVeh()
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('getAllVeh has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}


veh_ctl.getVehByType = async (req,res)=>{
  try
  {
    const type = req.body.type
    const jsonstr = await veh_model.getVehByType(type)
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('getVehByType has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}


veh_ctl.insertVeh = async (req,res)=>{
  try
  {
    const veh = req.body
    const jsonstr = await veh_model.insertveh(veh)
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('insertVeh has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}


veh_ctl.updateVeh = async (req,res)=>{
  try
  {
    const veh = req.body
    const jsonstr = await veh_model.updateVeh(veh)
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('updateVeh has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}


veh_ctl.deleteVeh = async (req,res)=>{
  try
  {
    const veh = req.body
    const jsonstr = await veh_model.deleteVeh(veh)
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('deleteVeh has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}