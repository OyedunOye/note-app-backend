const jwt = require('jsonwebtoken')
const config = require("./config")
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
    const auth = req.get("Authorization" || "authorization")
    if (auth && auth.startsWith("Bearer ")) {
        const updatedAuth = auth.replace("Bearer ", "")
        req.token = updatedAuth
    }
    next()
}

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, config.CRYPTO_KEY)
    if(!decodedToken) {
        return res.status(400).json({error:"Invalid token."})
    }
    req.user = await User.findById(decodedToken.id)
    next()
}

module.exports = { userExtractor, tokenExtractor }