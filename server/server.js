const express = require('express')
const { readdirSync } = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

//database connection
require('dotenv').config()
require('./config/database').connect()

const { PORT } = process.env


const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

readdirSync('./routes').map((r)=>{
    app.use('/api', require('./routes/'+r))
})


app.listen(PORT, () => {
    console.log("Server is running on "+ PORT)
})