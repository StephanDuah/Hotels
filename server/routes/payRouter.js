const express = require('express')
const router =  express.Router()
const {webhook,charge} = require('../controller/payController')


router.route("/pay").post(charge)
router.route("/webhook").post(webhook)
module.exports = router