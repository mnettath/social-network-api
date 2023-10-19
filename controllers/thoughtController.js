const { Thought, User } = require("../models");

module.exports = {
  // GET all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // GET a single thought by its id
  async getSingleThought(req, res) {
    try {
      const thoughtSelected = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      if (!thoughtSelected) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thoughtSelected);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // POST a new thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);

      const newThoughtId = newThought._id;

      const user = await User.findOne({ _id: req.body.userId });

      if (!user) {
        return res.status(404).json({
          message: "No user with that ID. Failed to add new thought!",
        });
      }

      user.thoughts.push(newThoughtId);
      await user.save();
      res.json(newThought);
      // push this thought to the user's thoughts array field
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // PUT to update a thought by its ID
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        // $set updated the document with values in the req.body
        { $set: req.body },
        { new: true } // return the updated thought
      );
      if (!updatedThought) {
        return res.status(404).json({
          message: "No user found with that ID. Failed to update thought!",
        });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // DELETE a thought by its _id
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!deletedThought) {
        return res
          .status(404)
          .json({ message: "No thought with that ID. Unable to delete!" });
      }
      res.json(deletedThought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
