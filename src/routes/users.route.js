const userRouter = require("express").Router();
const User = require("../models/user")
userRouter.get("/", async (req, res) => {
    const allUsers = await User.find({})
    res.json(allUsers)
})

module.exports = userRouter