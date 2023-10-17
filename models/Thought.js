const { Schema, model } = require("mongoose");

// Schema to create Thought model
const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, min: [1], max: [280] },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (createdAt) {
      return new Date(createdAt).toLocaleString();
    },
  },
  username: { type: String, required: true },
  reactions: [],
});
