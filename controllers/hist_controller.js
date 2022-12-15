var hist_controller = module.exports;
const hist_model = require('../models/hist_model');

hist_controller.getList = async (req, res) => {
  try {
    const jsonstr = await hist_model.getList();
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('history_controller.getList has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};

hist_controller.historyDetail = async (req, res) => {
  try {
    const userID = req.body.user_id;
    const jsonstr = await hist_model.historyDetail(userID);
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('history_controller.historyDetail has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};

hist_controller.vehDetail = async (req, res) => {
  try {
    const userID = req.body.user_id;
    const jsonstr = await hist_model.getVehByHist(userID);
    const json = JSON.parse(jsonstr);
    res.json(json);
  } catch (err) {
    console.log('history_controller.vehDetail has error: ' + err.message);
    res.json({ success: false, data: err.message });
  }
};
