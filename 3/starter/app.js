const express = require('express')
const morgan = require('morgan')

const tourRoute = require('./routes/tourRoutes')
const userRoute = require('./routes/userRoutes')

const app = express()


//中间件
app.use(express.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
    console.log('hello from midware')
    // console.log('hello from midware')
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})




app.use('/api/v1/users', userRoute)

app.use('/api/v1/tours', tourRoute)



module.exports = app