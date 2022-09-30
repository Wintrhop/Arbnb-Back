const { create } = require('./Users.model');
const User = require('./Users.model');

module.exports = {
  //get all
  async list(req, res) {
    try {
      const user = await User.find();
      res.status(201).json({ message: 'user found', data: user });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //getID
  async show(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      //populates
      res.status(201).json({ message: 'user found', data: user });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // post

  async create(req, res) {
    try {
      const data = req.body;

      const user = await User.create(data);

      res.status(201).json({ message: 'User Created', data: user });
    } catch (err) {
      res.status(400).json({ message: 'User could not be created', data: err });
    }
  },
  async update(req, res) {
    try {
      const data = req.body;
      const { userId } = req.params;
      const user = await User.findByIdAndUpdate(userId, data, { new: true });
      res.status(200).json({ message: 'User Updated', data: user });
    } catch (err) {
      res.status(400).json({ message: 'User could not be Updated', data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: 'Home Deleted', data: user });
    } catch (error) {
      res.status(400).json({ Message: 'Home could not be Deleted', data: err });
    }
  },
};
