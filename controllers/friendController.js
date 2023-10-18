const { User } = require("../models");

module.exports = {
  // POST to add a new friend to a user's friend list
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
  // DELETE to remove a friend from a user's friend list
  async deleteFriend(req, res) {
    try {
      const deletedFriend = await User.findOneAndDelete({
        _id: req.params.friendId,
      });
      if (!deletedFriend) {
        return res
          .status(404)
          .json({
            message: "No friend with that ID. Failed to delete friend!",
          });
      }
      res.json(deletedFriend);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
