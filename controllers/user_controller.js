var user_controller = module.exports
const user_model = require("../models/user_model")


user_controller.getAllUsers = async (req,res)=>{
  try
  {
    const jsonstr = await user_model.getAllUsers()
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('user_controller.getAllClass has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}


user_controller.getUserByEmail = async (req,res)=>{
  try
  {
    const email = req.body.email
    const jsonstr = await user_model.getUserByEmail(email)
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('user_controller.getUserByEmail has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}


user_controller.insertUser = async (req,res)=>{
  try
  {
    const user = req.body
    const jsonstr = await user_model.insertUser(user)
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('user_controller.insertUser has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}


user_controller.updateUser = async (req,res)=>{
  try
  {
    const user = req.body
    const jsonstr = await user_model.updateUser(user)
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('user_controller.updateUser has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}


user_controller.deleteUser = async (req,res)=>{
  try
  {
    const user_id = req.params.user_id
    const jsonstr = await user_model.deleteUser(user_id)
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('user_controller.deleteUser has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}
