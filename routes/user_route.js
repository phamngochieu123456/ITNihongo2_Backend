const express = require("express")
const router = express.Router()
const user_controller = require("../controllers/user_controller")


router.get("/getallusers",user_controller.getAllUsers)
router.post("/getuserbyemail",user_controller.getUserByEmail)
router.post("/insertuser",user_controller.insertUser)
router.put("/updateuser",user_controller.updateUser)
router.delete("/:user_id",user_controller.deleteUser)
router.post("/getuserbyqr",user_controller.getByQR)

module.exports = router
