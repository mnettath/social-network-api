const { User } = require("../models");

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // GET a single user by its _id and populated through and friend data
  async getSingleUser(req, res) {
    try {
      const userSelected = await User.findOne({ _id: req.params.userId });
      if (!userSelected) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(userSelected);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // POST a new user
  async createUser(req, res) {
    try {
      const newUserData = await User.create(req.body);
      res.json(newUserData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
