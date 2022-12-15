var pos_model = module.exports
const conn = require("../config/database")
const util = require("util")
const query = util.promisify(conn.query).bind(conn)


pos_model.getList = async () =>{
  try
  {
    const sql_query = `select * from positions where position_active = 1`
    var results = await query(sql_query)
    if(results.length > 0)
    {
      const json = {success: true, data: results}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
    else
    {
      const json = {success: false, data: 'Database has no positions yet'}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }
  catch(err)
  {
    console.log('position_model.getList has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}


pos_model.getByUser = async (userID) =>{
  try
  {
    const sql_query = `select * from positions where user_id = "` + userID + `"`
    var results = await query(sql_query)
    if(results.length > 0)
    {
      const json = {success: true, data: results[0]}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
    else
    {
      const json = {success: false, data: 'Cannot find positions with user_id: ' + userID}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }
  catch(err)
  {
    console.log('position_model.getByUser has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}

pos_model.getByVehicle = async (vehicleID) =>{
    try
    {
      const sql_query = `select * from positions where vehicle_id = "` + vehicleID + `"`
      var results = await query(sql_query)
      if(results.length > 0)
      {
        const json = {success: true, data: results[0]}
        const jsonstr = JSON.stringify(json)
        return jsonstr
      }
      else
      {
        const json = {success: false, data: 'Cannot find positions with vehicle_id: ' + vehicleID}
        const jsonstr = JSON.stringify(json)
        return jsonstr
      }
    }
    catch(err)
    {
      console.log('position_model.getByVehicle has error: ' + err.message)
      const json = {success: false, data: err.message}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }


pos_model.getDetail = async (posID) =>{
    try
    {
      const sql_query = `select * from positions where pos_id = "` + posID + `"`
      var results = await query(sql_query)
      if(results.length > 0)
      {
        const json = {success: true, data: results[0]}
        const jsonstr = JSON.stringify(json)
        return jsonstr
      }
      else
      {
        const json = {success: false, data: 'Cannot find positions with pos_id: ' + posID}
        const jsonstr = JSON.stringify(json)
        return jsonstr
      }
    }
    catch(err)
    {
      console.log('position_model.getDetail has error: ' + err.message)
      const json = {success: false, data: err.message}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }

pos_model.changeToOn = async (data) =>{
    try
    {
      var sql = "UPDATE positions SET user_id = ?, vehicle_id = ?, status ='1' WHERE pos_id = ?"
      data_list = [data.user_id, data.vehicle_id, data.pos_id]
      results = await query(sql,data_list)
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
      console.log('position_model.changeToOn has error: ' + err.message)
      const json = {success: false, data: err.message}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }


pos_model.changeToOff = async (data) =>{
    try
    {
        var sql = "UPDATE positions SET status ='0' WHERE pos_id = ?"
        data_list = [data.pos_id]
        results = await query(sql,data_list)
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
      console.log('position_model.changeToOff has error: ' + err.message)
      const json = {success: false, data: err.message}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }

pos_model.reserved = async (data) => {
    try
    {
      var sql = "select pos_id from positions WHERE status = '0' OR position_active = 0 LIMIT 1"
      results = await query(sql)
      if(results.affectedRows>0)
      {
        var sql = "UPDATE positions SET user_id = ?, vehicle_id = ?, QR_code = ?, status='1', position_active=1 WHERE pos_id = ?"
        data_list = [data.user_id, data.vehicle_id, data.ticket, results]
        result = await query(sql,data_list)
        if(result.affectedRows>0)
        {
          var sql = "INSERT INTO histories (user_id, pos_id) VALUES ?"
          data_list = [data.user_id, results]
          res = await query(sql,data_list)
          if(res.affectedRows>0)
          {
            var sql = "select * from users where user_id = ?"
            data_list = [data.user_id]
            res = await query(sql,data_list)
            if(res.affectedRows>0)
            {
              const json = {success: true, data: res}
              const jsonstr = JSON.stringify(json)
              return jsonstr
            }
            else
            {
              const json = {success: false, data: res}
              const jsonstr = JSON.stringify(json)
              return jsonstr
            }
          }
          else
          {
            const json = {success: false, data: res}
            const jsonstr = JSON.stringify(json)
            return jsonstr
          }
        }
        else
        {
          const json = {success: false, data: result}
          const jsonstr = JSON.stringify(json)
          return jsonstr
        }
      }
      else
      {
        const json = {success: false, data: "Have no empty position!"}
        const jsonstr = JSON.stringify(json)
        return jsonstr
      }
    }
    catch(err)
    {
      console.log('position_model.reserved has error: ' + err.message)
      const json = {success: false, data: err.message}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
}

pos_model.checkIn = async(data) => {
  try
    {
      var sql = "UPDATE positions SET status='2' WHERE user_id = ?"
      data_list = [data.ticket]
      results = await query(sql,data_list)
      if(results.affectedRows>0)
      {
        var sql = "UPDATE histories SET check_in = Now() WHERE user_id = ?"
        result = await query(sql,data_list)
        if(result.affectedRows>0)
        {
          const json = {success: true, data: result}
          const jsonstr = JSON.stringify(json)
          return jsonstr
        }
        else
        {
          const json = {success: false, data: result}
          const jsonstr = JSON.stringify(json)
          return jsonstr
        }
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
    console.log('position_model.checkIn has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}

pos_model.checkOut = async(data) => {
  try
    {
      var sql = "UPDATE positions SET user_id = NULL, vehicle_id = NULL, QR_code = NULL, status='0', position_active=0 WHERE user_id = ?"
      data_list = [data.ticket]
      results = await query(sql,data_list)
      if(results.affectedRows>0)
      {
        var sql = "UPDATE histories SET check_out = Now() WHERE user_id = ?"
        result = await query(sql,data_list)
        if(result.affectedRows>0)
        {
          
          const json = {success: true, data: result}
          const jsonstr = JSON.stringify(json)
          return jsonstr
        }
        else
        {
          const json = {success: false, data: result}
          const jsonstr = JSON.stringify(json)
          return jsonstr
        }
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
    console.log('position_model.checkOut has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}

pos_model.getEmpty = async() => {
  try
    {
      var sql = "select position_active, count(*) from positions"
      results = await query(sql)
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
    console.log('position_model.getEmpty has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}