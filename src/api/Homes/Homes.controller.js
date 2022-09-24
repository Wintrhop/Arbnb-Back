const { create } = require("./Homes.model");
const Homes= require("./Homes.model")

module.exports={

//get all
    async list(req, res) {
        try {
            const homes= await Homes.find()
            res.status(201).json({message:"Homes found", data: homes});
        } catch (err) {
            res.status(400).json(err);
        }
    },
//getID
    async show(req, res){
        try {
            const {homeId} = req.params
            const home = await Homes.findById(homeId)
            //populates 
            res.status(201).json({message:"Home found", data:home});
        } catch (err) {
            res.status(400).json(err);
        }
    },
// post

    async create(req, res){
        try {
            // const {homeId}= req.params; // usuario id
            const data= req.body;
            // const home = await Homes.findById(homeId)// para usuario
            
            // if (!home){
            //     throw new Error("Home invalida")
            // }
            // const newHome= {
            //     ...data,
            // }
            const home = await Homes.create(data);
            //user push
            
            res.status(201).json({message:"Home Created", data:home})
        } catch (err) {
            res.status(400).json({message:"Home could not be created", data:err})
            
        }
    },
    async update(req, res){
        try {
            const data = req.body
            const {homeId}= req.params;
            const home = await Homes.findByIdAndUpdate(homeId, data, {new:true})
            res.status(200).json({message:"Home Updated", data:home})
        } catch (err) {
            res.status(400).json({message:"Home could not be Updated", data: err})
            }
    },
    async destroy(req, res){
        try {
            const {homeId} = req.params;
            const home = await Homes.findByIdAndDelete(homeId)
            res.status(200).json({message:"Home Deleted", data:home})
        } catch (error) {
            res.status(400).json({Message:"Home could not be Deleted", data:err})
            
        }
    }


};