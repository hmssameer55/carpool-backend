const mongoose = require('mongoose')

const mongoLocal= "mongodb://localhost:27017/carPool"

const mongoURL = process.env.mongoURL

  
const makeDbConnection = () =>{
    try{
        mongoose.connect(mongoURL)
        console.log("connected to db")
    } catch(err){
        console.log("something went wrong",err)
    }
    mongoose.Promise=global.Promise
} 

module.exports=makeDbConnection