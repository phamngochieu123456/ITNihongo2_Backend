const express = require("express")
const router = express.Router()
const rela_controller = require("../controllers/rela_controller")

router.get("/getlist",rela_controller.getList)

module.exports = router