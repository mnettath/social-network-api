const { User } = require("../models");

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json("You have reached the get all users route!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
