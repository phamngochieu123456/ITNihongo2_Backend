const express = require("express")
const router = express.Router()
const pos_controller = require("../controllers/pos_controller")


router.get("/list", pos_controller.getList)
router.get("/user", pos_controller.getByUser)
router.get("/vehicle", pos_controller.getByVehicle)
router.get("/detail", pos_controller.getDetail)
router.put("/on", pos_controller.changeToOn)
router.put("/off", pos_controller.changeToOff)
router.put("/reserve", pos_controller.reserved)
router.put("/checkin", pos_controller.checkIn)
router.put("/checkout", pos_controller.checkOut)
router.get("/slot", pos_controller.getEmpty)

module.exports = router