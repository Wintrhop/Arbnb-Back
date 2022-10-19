const { create } = require("./Homes.model");
const Homes = require("./Homes.model");
const Users = require("../Users/Users.model");

module.exports = {
  //get all
  async list(req, res) {
    try {
      const homes = await Homes.find()
        .populate({
          path: "userId",
          select: "-_id name email rol",
        })
        
      res.status(201).json({ message: "Homes found", data: homes });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //getID
  async show(req, res) {
    try {
      const { homeId } = req.params;
      const home = await Homes.findById(homeId)
        .populate({ path: "userId", select: "-_id name email rol" })
        .populate({ path: "reservations", select: "-user -home" })
        .populate({
          path: "comments",
          select: "message",
          populate: {
            path: "userId",
            select: "-_id name",
          },
        });
      
      if(!home){
        throw new Error('Home not found');
      }
      res.status(201).json({ message: "Home found", data: home });
    } catch (error) {
      
      res.status(400).json({message: "error", data: error.message});
    }
  },
  // post

  async create(req, res) {
    try {
      const userId = req.userId;
      const data = req.body;
      const user = await Users.findById(userId);

      if (!user) {
        throw new Error("Usuario invalido");
      }
      const newHome = {
        ...data,
        userId: userId,
      };
      const home = await Homes.create(newHome);
      user.rol = "host";
      user.homes.push(home._id);
      await user.save({ validateBeforeSave: false });

      res.status(201).json({ message: "Home Created", data: home });
    } catch (err) {
      res.status(400).json({ message: "Home could not be created", data: err.message });
    }
  },
  async update(req, res) {
    try {
      const user = req.userId;
      const data = req.body;
      const { homeId } = req.params;
      let { userId } = await Homes.findById(homeId);

      if (!userId) {
        throw new Error("casa invalida");
      }

      if (userId._id.valueOf() !== user) {
        throw new Error("Usuario invalido");
      }

      const homeUpdate = await Homes.findByIdAndUpdate(homeId, data, {
        new: true,
      });
      res.status(200).json({ message: "Home Updated", data: homeUpdate });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Home could not be Updated", data: error.message });
    }
  },
  async destroy(req, res) {
    try {
      const user = req.userId;
      const { homeId } = req.params;
      let { userId } = await Homes.findById(homeId);

      if (userId._id.valueOf() !== user) {
        throw new Error("Usuario invalido");
      }
      const userHom = await Users.findById(userId);
      const newHomes = userHom.homes.filter(item => homeId !== item.toString());
      userHom.homes = newHomes;
      await userHom.save({validateBeforeSave: false});
      const home = await Homes.findByIdAndDelete(homeId);
      res.status(200).json({ message: "Home Deleted", data: home });
    } catch (error) {
      res
        .status(400)
        .json({ Message: "Home could not be Deleted", data: error.message });
    }
  },

  //get users homes
  async showUser (req,res) {
    try{
      const userId = req.userId
      const user = await Users.findById(userId,'homes -_id').populate({
        path:'homes'
      })

      if(!user){
        return res.status(400).json({message:'No user found'})
      }

      res.status(200).json({message:'homes found',data:user})
    } catch(err){
      res.status(400).json({message:'no hoes found',data:err})
    }
  }
};
