require('dotenv').config();
const express = require('express')
const makeDbConnection = require('./utils/db')
const bodyParser = require('body-parser')
const cors = require('cors')

const logger = require('morgan')
 
const userRouter = require("./routes/users")
const offerRouter = require("./routes/offers")
const rideRouter = require("./routes/rides")

const app = express() 

app.use(cors()) 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger (function (tokens, req, res) {

    return [
        new Date().toLocaleString(),
        req.headers.host,
        req.headers['x-forwarded-for'] || req.socket.remoteAddress, 
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')

}))


app.use("/users", userRouter)
app.use("/offers", offerRouter)
app.use("/rides", rideRouter)

app.listen(process.env.PORT || '3000', () => {
    console.log("listening at 3000")
    makeDbConnection()
})
