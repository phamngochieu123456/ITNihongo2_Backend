const express = require("express")
const router = express.Router()
const hist_controller = require("../controllers/hist_controller")


router.get("/list", hist_controller.getList)
router.get("/detail", hist_controller.historyDetail)
router.post("/detailVeh", hist_controller.vehDetail)

module.exports = router