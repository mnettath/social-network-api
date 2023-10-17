const { Schema, model, default: mongoose } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "Invalid email address",
    },
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

userSchema.plugin(uniqueValidator);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create model named User
const User = mongoose.model("user", userSchema);

module.exports = User;
