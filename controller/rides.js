const offerModel = require('../Models/offerSchema');

const rideController ={

    getAll: async (req, res) => {
        try{
            const email = req.params.email;
            const userRides = await offerModel.find({email:email})
            if (userRides) {
                res.status(200).send(userRides)
            } else {
                res.status(404).json({message: "No rides found"})
            }
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    },

    cancel: async (req, res) => {
        try{
            const id = req.params.id;
            const ride = await offerModel.findByIdAndDelete(id);
            if (ride) {
                res.status(200).json({message: "Ride cancelled"})
            } else {
                res.status(404).json({message: "Ride not found"})
            }
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    }
}

module.exports = rideController;