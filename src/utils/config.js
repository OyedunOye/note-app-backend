require("dotenv").config()

const PORT = process.env.PORT
const MONGO_DB_URL=process.env.MONGOOSE_DB_URI

module.exports = { PORT, MONGO_DB_URL }