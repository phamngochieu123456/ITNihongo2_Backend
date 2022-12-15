var pos_controller = module.exports;
const pos_model = require('../models/pos_model');

pos_controller.getList = async (req, res) => {
  try {
    const jsonstr = await pos_model.getList();
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('position_controller.getList has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};

pos_controller.getByUser = async (req, res) => {
  try {
    const userID = req.body.user_id;
    const jsonstr = await pos_model.getByUser(userID);
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('position_controller.getByUser has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};

pos_controller.getByVehicle = async (req, res) => {
  try {
    const vehicleID = req.body.vehicle_id;
    const jsonstr = await pos_model.getByVehicle(vehicleID);
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('position_controller.getByVehicle has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};

pos_controller.getDetail = async (req, res) => {
  try {
    const posID = req.body.pos_id;
    const jsonstr = await pos_model.getDetail(posID);
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('position_controller.getDetail has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};

pos_controller.changeToOn = async (req, res) => {
  try {
    const data = req.body;
    const jsonstr = await pos_model.changeToOn(data);
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('position_controller.changeToOn has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};

pos_controller.changeToOff = async (req, res) => {
  try {
    const data = req.body;
    const jsonstr = await pos_model.changeToOff(data);
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('position_controller.changeToOff has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};

pos_controller.reserved = async (req, res) => {
  try {
    const data = req.body;
    const jsonstr = await pos_model.reserved(data);
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('position_controller.reserved has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};

pos_controller.checkIn = async (req, res) => {
  try {
    const data = req.body;
    const jsonstr = await pos_model.checkIn(data);
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('position_controller.checkIn has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};

pos_controller.checkOut = async (req, res) => {
  try {
    const data = req.body;
    const jsonstr = await pos_model.checkOut(data);
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('position_controller.checkOut has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};

pos_controller.getEmpty = async (req, res) => {
  try {
    const jsonstr = await pos_model.getEmpty();
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('position_controller.getEmpty has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};
