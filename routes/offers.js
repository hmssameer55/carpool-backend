const offerController = require('../controller/offers')

const offerRouter = require('express').Router();

offerRouter.get("/getAll",(req,res)=>{
    offerController.getAll(req,res)
})

offerRouter.post('/getSome', (req, res) => {
    offerController.getSome(req, res)
    })

offerRouter.get("/:email",(req,res)=>{
    offerController.check(req,res)
})

offerRouter.post('/booking/:id', (req, res) => {
    offerController.bookOne(req, res) 
    })

offerRouter.get('/booking/getAll/:id', (req, res) => {
    offerController.getAllBookings(req, res)
    })

offerRouter.post('/booking/cancel/:offer_id', (req, res) => {
    offerController.cancelBooking(req, res)
    })

    

offerRouter.post("/post",(req,res)=>{
    offerController.post(req,res)
})

module.exports=offerRouter

