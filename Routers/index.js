const express = require("express")

const router = express.Router()

const authRoute = require("./auth")
const storyRoute = require("./story")
const userRoute = require("./user")
const commentRoute = require("./comment")

router.use("/api/auth",authRoute)
router.use("/api/story",storyRoute)
router.use("/api/user",userRoute)
router.use("/api/comment",commentRoute)


module.exports = router