const { User } = require("../models");

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("friends");
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
  // PUT to update a user by its _id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        // $set updated the document with the values in req.body
        { $set: req.body },
        // runValidators: ensures that any validation rules in Mongoose schema are applied during the update. If validation does not pass the update will be rejected
        // new - returns updated object
        { runValidators: true, new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // DELETE a user by its _id
  async deleteUser(req, res) {
    try { 
      const deletedUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!deletedUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(deletedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
