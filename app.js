const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// const port = 3003
const userRouter = require("./src/routes/users.route");
const noteRouter = require('./src/routes/note.route')
const loginRouter = require('./src/routes/login.route')
const middleware = require("./src/utils/middleware")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

app.use("/api/users", userRouter)

app.use("/api/notes", noteRouter)

app.use("/api/login", loginRouter)

app.get('/', (req, res) => {
  res.send('Hello Shade!')
})


module.exports = app