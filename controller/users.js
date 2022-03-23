const userModel = require("../Models/userSchema")


const userController = {

    login: async (req, res) => {

        const email = req.body.userName
        const password = req.body.password

        try {
            const user = await userModel.findOne({ email: email })
            if (user) {
                if (user.password === password) {
                    res.status(200).send(user)
                } else {
                    res.status(401).send("password is incorrect")
                }
            } else {
                res.status(400).send("no user found")
            }
        } catch (err) {
            console.log(err)
        }
    },

    getAll: async (req, res) => {
        try {
            const user = await userModel.find({})
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send("No user found");
            }
        } catch (err) {
            console.log(err);
        }
    },


    signup: async (req, res) => {
        try {
            const newUser = req.body
            
            const exist = await userModel.findOne({ email: newUser.email })
            if (exist) {
                res.status(400).send({ message: "Email already exist" })
                return
            }

            const user = await userModel.create(newUser)
            if (user) {
                res.status(200).send(user)
            } else {
                res.status(401).send("!!!!!")
            }

        } catch (err) {
            res.send("something went wrong while creating user")
        }
    }
};

module.exports = userController;