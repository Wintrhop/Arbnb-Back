const Comments = require("./Comments.model");
const Users = require("../Users/Users.model");
const Homes = require("../Homes/Homes.model");

module.exports ={
    //get all 
    async list(req, res) {
        try {
          const comments = await Comments.find()
          res.status(201).json({ message: "Comments found", data: comments });
        } catch (err) {
          res.status(400).json(err);
        }
      },
      //getID
  async show(req, res) {
    try {
      const { commentId } = req.params;
      const comment = await Comments.findById(commentId);
      //populates
      res.status(201).json({ message: "Comment found", data: comment });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // post

  async create(req, res) {
    try {
      const userId = req.userId;
      const { homeId } = req.params;
      const data = req.body;
      const user = await Users.findById(userId);
      const home= await Homes.findById(homeId);

      if (!user) {
        throw new Error("Usuario invalido");
      }
      const newComment = {
        ...data,
        userId: userId,
        homeId: homeId,
      };
      const comment = await Comments.create(newComment);
      
      user.comments.push(comment);
      await user.save({ validateBeforeSave: false });
      home.comments.push(comment);
      await home.save({validateBeforeSave: false });

      res.status(201).json({ message: "Comment Created", data: home });
    } catch (err) {
      res.status(400).json({ message: "Comment could not be created", data: err });
    }
  },
  //update
  async update(req, res) {
    try {
      const user = req.userId;
      const data = req.body;
      const { commentId } = req.params;
      let { userId } = await Comments.findById(commentId);

      if (!userId) {
        throw new Error("Comentario invalido");
      }

      if (userId._id.valueOf() !== user) {
        throw new Error("Usuario invalido");
      }

      const commentUpdate = await Comments.findByIdAndUpdate(commentId, data, {
        new: true,
      });
      res.status(200).json({ message: "Comment Updated", data: commentUpdate });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Comment could not be Updated", data: error });
    }
  },
  //delete
  async destroy(req, res) {
    try {
    const user = req.userId;
    const { commentId } = req.params;
    let { userId } = await Comments.findById(commentId);
      
      if (userId._id.valueOf() !== user) {
        throw new Error("Usuario invalido");
      }
      const comment = await Comments.findByIdAndDelete(commentId);
      res.status(200).json({ message: "Comment Deleted", data: comment });
    } catch (error) {
      res
        .status(400)
        .json({ Message: "Comment could not be Deleted", data: error });
    }
  },
};