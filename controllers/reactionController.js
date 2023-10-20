const { Thought } = require("../models");
// importing reactionSchema from the path
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
  // DELETE to remove a reaction by the reactionId
  async deleteReaction(req, res) {
    try {
      // the user provides their thoughtId in the url
      const primaryThought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!primaryThought) {
        return res.status(404).json({
          message: "No thought with that ID. Failed to delete reaction!",
        });
      }

      // they will provide the reactionId they wish to remove in the req.body
      const deletedReaction = {
        _id: req.body.reactionId,
      };

      primaryThought.reactions.splice(deletedReaction, 1);
      await primaryThought.save();
      res.json(primaryThought);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
