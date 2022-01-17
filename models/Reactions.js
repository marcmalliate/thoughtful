const { Schema, Types } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema(
  {
    // Sets ID for reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 250,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
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
