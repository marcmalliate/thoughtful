const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    // set ID for reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      // uses moment
      get: (createdTime) => moment(createdTime).format("LLLL"),
    },
  },

  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;
