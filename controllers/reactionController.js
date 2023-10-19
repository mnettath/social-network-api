const { Thought } = require("../models");
const reactionSchema = require("../models/Reaction");

module.exports = {
  // POST a reaction stored in a single thought's reaction array field
  async createReaction(req, res) {
    try {
      const newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };
      const primaryThought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!primaryThought) {
        return res.status(404).json({
          message: "No thought with that ID. Failed to add reaction!",
        });
      }

      primaryThought.reactions.push(newReaction);
      await primaryThought.save();
      res.json(newReaction);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
