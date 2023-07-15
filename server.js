require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const connectDB = require('./config/dbConn')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const routes = require('./routes/noteRoutes')

const PORT = process.env.PORT || 5000

connectDB()
app.use(logger)

app.use(express.json())
app.use(cors(corsOptions))
app.use('/',routes)

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./route/root'))
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname,'views','404.html'))
    } else if (req.accepts('json')) {
        res.send({message:"404 not found"})
    } else {
        res.type('text').send('404 not found')
    }
})
app.use(errorHandler)



mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
  })
  