const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// const port = 3003
const userRouter = require("./src/routes/users.route");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use("/api/users", userRouter)

app.get('/', (req, res) => {
  res.send('Hello Shade!')
})


module.exports = app