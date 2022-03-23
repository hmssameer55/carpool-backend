const offerModel = require('../Models/offerSchema');

    // TASKS DONE HERE:
    //1. get all the offers
    //2. get a specific offer
    //3. create a new offer
    //4. update an offer
    //5. delete an offer

   

const offerController = {

    getAll: async (req, res) => {
        try {
            const offers = await offerModel.find({});
            res.status(200).send(offers);
        } catch (err) {
            console.log(err);
        }
    },

    check: async (req, res) => {
        try {
            const email = req.params.email;
            const offer = await offerModel.find({ email: email });
            if (offer.length > 0) {
                res.status(200).send({ message: "You already have an offer" });
                return
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Something went wrong" });
        }
    },

    bookOne: async (req, res) => {
        try {
            const { user_id,user_name } = req.body;
            const offer_id = req.params.id
            console.log(user_id)

            const offer = await offerModel.findById(offer_id);

            if (offer) { 
 
                //check if seats are available
                if (offer.seatsLeft === 0) {
                    res.status(200).send({ message: "Sorry No more seats left" });
                    return
                } 
                
                //check if the user has already booked the offer
                const results=  offer.bookedBy.find(booked => {
                        if(booked.user_id.toString() === user_id) {
                            return true
                        } 
                    })
        
                //if booked
                if(results) {
                    res.status(400).send({ message: "You already booked this offer" });
                    return
                }
               
                //if not booked
                //update the offer
                   offer.bookedBy.push({user_id,user_name});
                   offer.seatsLeft = offer.seatsLeft - 1;
                   await offer.save();
                   return res.status(200).send({message:"Booked"});
                }
    

        } catch (err) {
            res.status(500).send({ message: "Something went wrong" });
            console.log(err);
        }
    },

    getAllBookings: async (req, res) => {
        try {
            const user_id = req.params.id;
            const offers = await offerModel.find({ bookedBy: { $elemMatch: { user_id: user_id } } });
            res.status(200).send(offers);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Something went wrong" });
        }
    },

    cancelBooking: async (req, res) => {
        try {
            const offer_id = req.params.offer_id;
            const user_id = req.body.user_id;
            const offer = await offerModel.findById(offer_id);
            if (offer) {
                const newOffer = offer.bookedBy.filter(booked => {
                    if (booked.user_id.toString() === user_id) {
                        return false
                    } else {
                        return true
                    }
                })

                console.log(newOffer)
                offer.bookedBy = newOffer;
                offer.seatsLeft += 1;
                await offer.save();
                return res.status(200).send({ message: "Booking cancelled" });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Something went wrong" });
        }
    },

    getSome: async (req, res) => {
        try {
            const {
                from,
                to,
                date,
                seatsLeft
            } = req.body;

            const offers = await offerModel.find({
                pickUP: from,
                destination: to,
                // date:date,
                // seatsLeft:seatsLeft
            });
            if (offers.length > 0) {
               return res.status(200).send(offers);
            } else {
               return res.status(404).send("No offers found");
            }
        } catch (err) {
            console.log(err);
        }
    },
 
    post: async (req, res) => {
        try {
            const offer = {
                email: req.body.email,
                name: req.body.name,
                car: req.body.vehicle,
                vehicleNo: req.body.vehicleNumber,
                seatsLeft: req.body.seatsLeft,
                pickUP: req.body.from,
                destination: req.body.to,
                date: req.body.date,
                price: req.body.price
            };
            const newOffer = await offerModel.create(offer);
            res.status(200).send(newOffer);
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports = offerController;