/*'use strict'
const express = require('express')
const config = require('./config')
const cors = require('cors')
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accountRoutes')
const app = express()

app.use(cors())
app.use(bodyParser.json());

app.use('/api', accountRoutes.routes)

app.listen(config.port, () => console.log("Server started on http://localhost:" + config.port))*/
