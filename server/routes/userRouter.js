const express = require('express')
const {login,register,getUser} = require("../controller/userController")
const router = express.Router()

router.route("/login").post(login)


router.route("/register").post(register)

router.route('/users').get(getUser)

module.exports = router