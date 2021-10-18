const { Schema, models } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: [1, "thoughts cannot be empty"],
    maxlength: [280, "cannot be more than 280 characters"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },

  username: {
    type: String,
    required: true,
  },

  reactions: [reactionSchema],

  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = models("Thought", thoughtSchema);

module.exports = Thought;
