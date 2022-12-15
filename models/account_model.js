var account_model = module.exports
const conn = require("../config/database")
const util = require("util")
const query = util.promisify(conn.query).bind(conn)


account_model.getUserByEmail= async (Email) =>{
  try
  {
    const sql_query = `SELECT * FROM users WHERE email = ? AND user_active = 1`
    user_list = [Email]
    var results = await query(sql_query, user_list)
    if(results.length > 0)
    {
      const json = {success: true, data: results[0]}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
    else
    {
      const json = {success: false, data: 'Invalid Email!'}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }
  catch(err)
  {
    console.log('account_model.getUserByEmail has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}


account_model.getUserByUser_id= async (User_id) =>{
  try
  {
    const sql_query = `SELECT * FROM users WHERE user_id = ? AND user_active = 1`
    user_list = [User_id]
    var results = await query(sql_query, user_list)
    if(results.length > 0)
    {
      const json = {success: true, data: results[0]}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
    else
    {
      const json = {success: false, data: 'Cannot find user with user_id: ' + User_id}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }
  catch(err)
  {
    console.log('account_model.account_model.getUserByUser_id has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}


