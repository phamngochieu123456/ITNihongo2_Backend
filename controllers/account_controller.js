var account_controller = module.exports
const bcrypt = require("bcrypt")
const account_model = require("../models/account_model")
const user_model = require("../models/user_model")


account_controller.getUserByEmail = async (Email) =>{
  try
  {
    const jsonstr = await account_model.getUserByEmail(Email)
    return jsonstr
  }
  catch(err)
  {
    console.log('account_controller.getUserByEmail has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}


account_controller.getUserByUser_id = async (User_id) =>{
  try
  {
    const jsonstr = await account_model.getUserByUser_id(User_id)
    return jsonstr
  }
  catch(err)
  {
    console.log('account_controller.getUserByUser_id has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}


account_controller.compare_password =  async (password, password_hash) =>{
  const result = await bcrypt.compare(password, password_hash)
  return result
}


account_controller.login = async (req,res) =>{
  try
  {
    const email = req.body.email
    const password = req.body.password
    const jsonstr = await account_controller.getUserByEmail(email)
    const json = JSON.parse(jsonstr)
    if(json.success)
    {
      if(await account_controller.compare_password(password, json.data.password))
      {
        res.json({success: true, data: "Login successfully!"})
      }
      else
      {
        res.status(403).json({success: false, data: "Invalid Password!"})
      }
    }
    else
    {
      res.status(403).json(json)
    }
  }
  catch(err)
  {
    console.log('account_controller.login has error: ' + err.message)
    const json = {success: false, data: err.message}
    return res.json(json)
  }
}


account_controller.register = async (req,res) =>{
  try
  {
    const user = req.body
    const jsonstr = await user_model.insertUser(user)
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('account_controller.register has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}


account_controller.changePassword = async (req,res,next) =>{
  try
  {
    const user_id = req.body.user_id
    const old_password = req.body.old_password
    const new_password = req.body.new_password

    const jsonstr = await account_model.getUserByUser_id(user_id)
    const json = JSON.parse(jsonstr)
    if(json.success)
    {
      if(await account_controller.compare_password(old_password, json.data.password))
      {
        const user = json.data
        user.password = bcrypt.hashSync(new_password,5)
        req.body = user
        next()
      }
      else
      {
        const json = {success: false, data: "Old Password incorrect!"}
        res.json(json)
      }
    }
    else
    {
      res.json(json)
    }
  }
  catch(err)
  {
    console.log('account_controller.changePassword has error: ' + err.message)
    const json = {success: false, data: err.message}
    return res.json(json)
  }
}