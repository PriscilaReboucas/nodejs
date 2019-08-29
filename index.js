const express = require('express')
const json = require('body-parser')
const cors = require('cors')
const app = express()
const expressLayouts = require('express-ejs-layouts')
require('dotenv-safe').config({allowEmptyValues:true})
app.use(json())
app.use(cors())
app.set('view engine','ejs')
app.use(expressLayouts)
const config = process.env
require('./database/sequelize')
app.datasource = {
    mongodb:require('./database/mongodb')()
}
require('./routes')(app)
app.listen(config.PORT,() => console.log('ok'))