const Homes = require("../Homes/Homes.model")
const Users = require("../Users/Users.model")
const Reservations = require("./reservation.model")

module.exports = {
    async create (req,res) {
        try{
            const data = req.body

            const user = await Users.findById(data.userId)

            const home = await Homes.findById(data.homeId)

            const newReservation = {
                ...data,
                home: home,
                user: user
            }

            const reservation = await Reservations.create(newReservation)

            user.reservations.push(reservation)
            await user.save({validateBeforeSave:false})
            
            home.reservations.push(reservation)
            await home.save({validateBeforeSave:false})

            res.status(200).json({message:'Reservation created',data:reservation})
            
        } catch(err){
            res.status(400).json({message:'Could not create reservation',data:err.message})
        }
    },

    async show (req,res){
        try{
            const data = req.body

            const user = await Users.findById(data.userId)

            const reservation = await Users.findById(data.reservationId)
        } catch(err){

        }
    }
}