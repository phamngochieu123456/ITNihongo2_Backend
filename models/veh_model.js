var veh_model = module.exports;
const conn = require('../config/database');
const util = require('util');
const uuid = require('uuid');
const query = util.promisify(conn.query).bind(conn);

veh_model.getAllVeh = async () => {
  try {
    const sql_query = `SELECT * FROM vehicles WHERE vehicle_id = 'veh01'`;
    var result = await query(sql_query);
    if (result.length > 0) {
      const json = { success: true, data: result };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = { success: false, data: 'Database has already empty.' };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('getAllVeh has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};

veh_model.getVehByVehId = async (vehicle_id) =>{
  try
  {
    const sql_query = `SELECT * FROM vehicles WHERE vehicle_id = "` + vehicle_id + `"`
    var results = await query(sql_query)
    if(results.length > 0)
    {
      const json = {success: true, data: results[0]}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
    else
    {
      const json = {success: false, data: 'Cannot find vehicle with id: ' + vehicle_id}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }
  catch(err)
  {
    console.log('veh_model.getVehByVehId has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}

veh_model.getVehByType = async (type) => {
  try {
    const sql_query =
      `SELECT * FROM vehicles WHERE vehicle_type = '` + type + `'`;
    var result = await query(sql_query);
    if (result.length > 0) {
      const json = { success: true, data: result };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = {
        success: false,
        data: 'Cannot find any vehicle by this type: ' + type,
      };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('getVehByType has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};

veh_model.insertVeh = async (veh) => {
  try {
    var sql = "INSERT INTO vehicles (vehicle_id, vehicle_type, vehicle_plates, vehicle_color, vehicle_active) VALUES ?";
    var new_veh = [[uuid.v4(), veh.vehicle_type, veh.vehicle_plates, veh.vehicle_color, veh.vehicle_active]];
    result = await query(sql,[new_veh]);
    var data_veh = {
      vehicle_id: new_veh[0][0],
      vehicle_type: new_veh[0][1],
      vehicle_plates:new_veh[0][2],
      vehicle_color:new_veh[0][3],
    }
    if (result.affectedRows > 0) {
      const json = { success: true, result: result,data:data_veh};
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = { success: false, result: result };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('insertVeh has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};

veh_model.updateVeh = async (veh) => {
  try {
    var sql =
      'UPDATE vehicles SET vehicle_type = ?, vehicle_plates = ?, vehicle_color = ?, vehicle_active = ? WHERE vehicle_id = ?';
    new_veh = [veh.type, veh.plate, veh.color, veh.active, veh.id];
    result = await query(sql, new_veh);
    if (result.affectedRows > 0) {
      const json = { success: true, data: result };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = { success: false, data: result };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('updateVeh has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};

veh_model.deleteVeh = async (veh) => {
  try {
    var sql = 'UPDATE vehicles SET active = 0 WHERE vehicle_id = ?';
    del = [veh.vehicle_id];
    result = await query(sql, del);
    if (results.affectedRows > 0) {
      const json = { success: true, data: result };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = { success: false, data: result };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('deleteVeh has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};
