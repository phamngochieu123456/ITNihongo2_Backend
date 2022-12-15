var hist_model = module.exports;
const conn = require('../config/database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

hist_model.getList = async () => {
  try {
    const sql_query = `SELECT user.name, his.checkin_time, his.checkout_time, 
    veh.vehicle_type, veh.vehicle_plates, veh.vehicle_color 
    FROM histories as his INNER JOIN users_vehicles as rela 
    ON rela.user_id = his.user_id INNER JOIN vehicles as veh 
    ON veh.vehicle_id=rela.vehicle_id INNER JOIN users as user
    ON user.user_id = his.user_id`;
    var results = await query(sql_query);
    if (results.length > 0) {
      const json = { success: true, data: results };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = { success: false, data: 'Database has no histories yet' };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('history_model.getList has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};

hist_model.historyDetail = async (userID) => {
  try {
    const sql_query =
      `select * from histories where user_id = "` + userID + `"`;
    var results = await query(sql_query);
    if (results.length > 0) {
      const json = { success: true, data: results[0] };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = {
        success: false,
        data: 'Cannot find histories with user_id: ' + userID,
      };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('history_model.historyDetail has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};

hist_model.getVehByHist = async (userID) => {
  try {
    const sql_query =
      `SELECT his.checkin_time, his.checkout_time, 
	veh.vehicle_type, veh.vehicle_plates, veh.vehicle_color 
	FROM histories as his INNER JOIN users_vehicles as rela 
	ON rela.user_id = his.user_id INNER JOIN vehicles as veh 
	ON veh.vehicle_id=rela.vehicle_id 
	where his.user_id="` +
      userID +
      `"`;
    var results = await query(sql_query);
    if (results.length > 0) {
      const json = { success: true, data: results };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = {
        success: false,
        data: 'Cannot find histories with user_id: ' + userID,
      };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('history_model.getVehByHist has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};
