var user_veh_controller = module.exports
const user_veh_model = require("../models/user_veh_model")
const user_model = require("../models/user_model")
const veh_model = require("../models/veh_model")


user_veh_controller.getUserVehByUserId = async (req,res)=>{
  try
  {
    const user_id = req.params.user_id
    const user_veh_jsonstr = await user_veh_model.getUserVehByUserId(user_id)
    const user_veh_json = JSON.parse(user_veh_jsonstr)
    if(user_veh_json.success)
    {
      user_jsonstr = await user_model.getUserByUserId(user_veh_json.data.user_id)
      user_json = JSON.parse(user_jsonstr)
      veh_jsonstr = await veh_model.getVehByVehId(user_veh_json.data.vehicle_id)
      veh_json = JSON.parse(veh_jsonstr)

      const user_veh_info_json = {};
      let key;
      for (key in user_json.data) {
        if(user_json.data.hasOwnProperty(key)){
          user_veh_info_json[key] = user_json.data[key];
        }
      }

      for (key in veh_json.data) {
        if(veh_json.data.hasOwnProperty(key)){
          user_veh_info_json[key] = veh_json.data[key];
        }
      }

      res.json({success:true, data: user_veh_info_json})
    }
    else
    {
      res.json(user_veh_json)
    }
    
  }
  catch(err)
  {
    console.log('user_veh_controller.getUserVehByUserId has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}


user_veh_controller.insertUserVeh = async (req,res)=>{
  try
  {
    const user_id = req.body.user_id
    const vehicle_id = req.body.vehicle_id
    const jsonstr = await user_veh_model.insertUserVeh(user_id, vehicle_id)
    const json = JSON.parse(jsonstr)
    res.json(json)
  }
  catch(err)
  {
    console.log('user_veh_controller.insertUserVeh has error: ' + err.message)
    res.json({success: false, data: err.message})
  }
}