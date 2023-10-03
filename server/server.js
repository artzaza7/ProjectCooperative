const express = require('express')
const { readdirSync } = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const YAML = require('yamljs')

const swaggerDocument = YAML.load('./swagger.yaml')
//database connection
require('dotenv').config()
require('./config/database').connect()

const { PORT } = process.env


const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


// readdirSync('./routes').map((r)=>{
//     app.use('/api', require('./routes/'+r))
// })

app.use('/api', require('./routes/userRoute'))




app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
    console.log("Server is running on "+ PORT)
})