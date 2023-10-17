const { User } = require("../models");

module.exports = {
  async createFriend(req, res) {
    try {
      // This creates a new user
      const newFriend = await User.create(req.body);

      const newFriendId = newFriend._id;

      const primaryUser = await User.findOne({ _id: req.params.userId });

      if (!primaryUser) {
        return res.status(404).json({
          message: "No primary user with that ID. Failed to update friend!",
        });
      }

      primaryUser.friends.push(newFriendId);
      await primaryUser.save();

      res.json(newFriend);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
