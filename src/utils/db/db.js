const config = require('../config');
const logger = require('../logger');
const mongoose =require("mongoose");

logger.info("Connecting to mongo db ...")

const connectdb = () => {
    mongoose.connect(config.MONGO_DB_URL).then(()=>
    logger.info("Connected to mongo db")).catch((error) =>
        logger.error('Failed to connect to mongo db', error)
    )
}

// const db = mongoose.connection
// db.on("error", console.error.bind("error"))

module.exports = connectdb