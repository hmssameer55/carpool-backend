const rideController = require('../controller/rides');

const rideRouter = require('express').Router();

rideRouter.get("/getAll/:email" , rideController.getAll);

rideRouter.get('/cancel/:id', (req, res) => {
    rideController.cancel(req, res) })

module.exports = rideRouter;