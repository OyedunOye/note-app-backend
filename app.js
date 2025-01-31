const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
// const port = 3003
const userRouter = require("./src/routes/users.route");
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use("/api/users", userRouter)

app.get('/', (req, res) => {
  res.send('Hello Shade!')
})

module.exports = app