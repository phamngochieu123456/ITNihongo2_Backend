var user_model = module.exports;
const conn = require('../config/database');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

user_model.getUserByQR = async (user_id) => {
  try {
    const sql_query = `SELECT his.checkin_time, user.name, veh.vehicle_type, veh.vehicle_plates 
    FROM users as user INNER JOIN histories as his ON his.user_id = user.user_id 
    INNER JOIN users_vehicles as rela ON rela.user_id = user.user_id 
    INNER JOIN vehicles as veh ON veh.vehicle_id = rela.vehicle_id where his.user_id="` + user_id + `"`;
    var results = await query(sql_query);
    if (results.length > 0) {
      const json = { success: true, data: results[0] };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = {
        success: false,
        data: 'Cannot find user with user_id: ' + user_id,
      };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('user_model.getUserByQR has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};
user_model.getUserByUserId = async (user_id) =>{
  try
  {
    const sql_query = `SELECT * FROM users WHERE user_id = "` + user_id + `"` + `and user_active = 1`
    var results = await query(sql_query)
    if(results.length > 0)
    {
      const json = {success: true, data: results[0]}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
    else
    {
      const json = {success: false, data: 'Cannot find user with user_id: ' + user_id}
      const jsonstr = JSON.stringify(json)
      return jsonstr
    }
  }
  catch(err)
  {
    console.log('user_model.getUserByUserId has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}
user_model.getAllUsers = async () => {
  try {
    const sql_query = `SELECT * FROM users WHERE user_active = 1`;
    var results = await query(sql_query);
    if (results.length > 0) {
      const json = { success: true, data: results };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = { success: false, data: 'Database has no users yet' };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('user_model.getAllUsers has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};

user_model.getUserByEmail = async (email) => {
  try {
    const sql_query =
        `SELECT * FROM users WHERE email = "` +
        email +
        `"` +
        `and user_active = 1`;
    var results = await query(sql_query);
    if (results.length > 0) {
      const json = { success: true, data: results[0] };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = {
        success: false,
        data: 'Cannot find user with email: ' + email,
      };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('user_model.getUserByEmail has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};

user_model.insertUser = async (user) =>{
  try
  {
    var sql = "INSERT INTO users (user_id, email, password, name, sex, phone, role) VALUES ?"
    let user_list = [[uuid.v4(), user.email, bcrypt.hashSync(user.password,5), user.name, user.sex, user.phone, user.role]]
    let results = await query(sql,[user_list])
    let data_user = {
      user_id : user_list[0][0],
      user_email: user_list[0][1]
    }
    if(results.affectedRows>0)
    {
      const json = {success: true, data: results, input: data_user}
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
    console.log('user_model.insertUser has error: ' + err.message)
    const json = {success: false, data: err.message}
    const jsonstr = JSON.stringify(json)
    return jsonstr
  }
}

user_model.updateUser = async (user) => {
  try {
    var sql =
        'UPDATE users SET email = ?, password = ?, name = ?, sex = ?, phone = ?, role = ? WHERE user_id = ?';
    user_list = [
      user.email,
      bcrypt.hashSync(user.password, 5),
      user.name,
      user.sex,
      user.phone,
      user.role,
      user.user_id,
    ];
    results = await query(sql, user_list);
    if (results.affectedRows > 0) {
      const json = { success: true, data: results };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = { success: false, data: results };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('user_model.updateUser has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};

user_model.deleteUser = async (user_id) => {
  try {
    var sql = 'UPDATE `users` SET `user_active` = 0 WHERE `user_id` = ?';
    console.log(user_id);
    let user_list = [user_id];
    let results = await query(sql, user_list);
    if (results.affectedRows > 0) {
      const json = { success: true, data: results };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    } else {
      const json = { success: false, data: results };
      const jsonstr = JSON.stringify(json);
      return jsonstr;
    }
  } catch (err) {
    console.log('user_model.deleteUser has error: ' + err.message);
    const json = { success: false, data: err.message };
    const jsonstr = JSON.stringify(json);
    return jsonstr;
  }
};