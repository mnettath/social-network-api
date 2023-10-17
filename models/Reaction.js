const { Schema, model, default: mongoose } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId(),
  },
  reactionBody: { type: String, required: true, max: [280] },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (createdAt) {
      return new Date(createdAt).toLocaleString();
    },
  },
});

module.exports = reactionSchema;
