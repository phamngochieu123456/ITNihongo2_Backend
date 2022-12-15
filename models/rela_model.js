var rela_model = module.exports
const conn = require("../config/database")
const util = require("util")
const query = util.promisify(conn.query).bind(conn)


rela_model.getList = async () =>{
  try
  {
    const sql_query = `SELECT * FROM users_vehicles`
    var result = await query(sql_query)
    if(result.length > 0)
    {
      const json = {success: true, data: result}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
    else
    {
      const json = {success: false, data: 'Database has already empty.'}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }
  catch(err)
  {
    console.log('getList has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}