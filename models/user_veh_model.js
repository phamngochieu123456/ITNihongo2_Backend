var user_veh_model = module.exports
const conn = require("../config/database")
const uuid = require("uuid")
const util = require("util")
const query = util.promisify(conn.query).bind(conn)


user_veh_model.getUserVehByUserId = async (user_id) =>{
  try
  {
    const sql_query = `SELECT * FROM users_vehicles WHERE user_id = "` + user_id + `"`
    var results = await query(sql_query)
    if(results.length > 0)
    {
      const json = {success: true, data: results[0]}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
    else
    {
      const json = {success: false, data: 'user with id ' + user_id + ' not registered the vehicle!'}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }
  catch(err)
  {
    console.log('user_veh_model.getUserVehByUserId has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}


user_veh_model.insertUserVeh = async (user_id, vehicle_id) =>{
  try
  {
    var sql = "INSERT INTO users_vehicles (relative_id, user_id, vehicle_id) VALUES ?"
    user_veh_list = [[uuid.v4(), user_id, vehicle_id]]
    results = await query(sql,[user_veh_list])
    if(results.affectedRows>0)
    {
      const json = {success: true, data: results}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
    else
    {
      const json = {success: false, data: results}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }
  catch(err)
  {
    console.log('user_veh_model.insertUserVeh has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}

