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
    
    try {
        const { firstName, lastName, email, password } = req.body
        const existingEmail  = await User.find({email: email}).exec()
        console.log(existingEmail)

        if (existingEmail.length >= 1) {
            return res.status(409).json({user: null, message: "User already exists, please login."})
        }
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

userRouter.delete("/:id", async (req,res) => {
    try {
        const id = req.params.id
        const deletedUser = await User.findByIdAndDelete(id).exec()
        console.log(deletedUser)
        if (!deletedUser) {
            return res.status(404).json({ message: "User does not exist!" });
        }
        res.status(200).json({message: `User ${deletedUser.firstName} has been deleted successfully.`})
        } catch (error) {
            res.status(500).json({ error: "An error occurred while deleting the item" });
        }
    
})


module.exports = userRouter