const express = require("express")
const router = express.Router()
const user_veh_controller = require("../controllers/user_veh_controller")


router.get("/:user_id",user_veh_controller.getUserVehByUserId)
router.post("/", user_veh_controller.insertUserVeh)


module.exports = router