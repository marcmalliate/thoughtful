const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, trim: true, unique: true, required: true },

    email: {
      type: String,
      match: /^([\da-z_.-]+)@([\da-z.-]+)\.([a-z]{2,6})$/,
      unique: true,
      required: true,
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property to display the number of friends a user has
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model("Users", userSchema);

module.exports = User;
