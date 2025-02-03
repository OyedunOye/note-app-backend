const userRouter = require("express").Router();
const bcrypt = require('bcrypt')
const User = require("../models/user")
userRouter.get("/", async (req, res) => {
    const allUsers = await User.find({})
    res.json(allUsers)
})

userRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.json(user)
}) 

userRouter.post("/", async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    try {
        const salt = 10
        // console.log(req)
        // console.log(firstName, lastName, email, password)
        // console.log(req.body)
        const passwordHash = await bcrypt.hashSync(password, salt)
        const newUser = new User({firstName, lastName, email, passwordHash})
        const saveUser = await newUser.save()
        res.status(201).json({user: saveUser, message: "User created Successfully!"})
    } catch (error) {
        console.log(error)
    }
}) 

module.exports = userRouter