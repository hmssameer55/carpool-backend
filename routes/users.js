
const userController = require('../controller/users')

const userRouter = require('express').Router()


userRouter.post("/login", (req, res) => {
    userController.login(req,res)
})


userRouter.post("/signup", (req,res)=>{
    userController.signup(req,res)
})

userRouter.get("/getAll", (req,res)=>{
    userController.getAll(req,res)
})


module.exports = userRouter 