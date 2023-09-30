const mongoose = require('mongoose')

const { MONGO_URI } = process.env

exports.connect = () => {
    //connect to database

    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    })
    .then(() => {
        console.log("Connected to database")
    })
    .catch((error) => {
        console.log("Error while connecting to database")
        console.error(error)
        process.exit(1)
    })
}