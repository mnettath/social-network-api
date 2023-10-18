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
};
