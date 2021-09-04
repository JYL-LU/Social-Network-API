const { Schema, models, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Type.ObjectId,
    default: new Type.ObjectId(),
  },

  reactionBody: {
    type: String,
    required: true,
    maxlength: [280, "cannot be more than 280 characters"],
  },

  username: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    timestraps: true, // Use a getter method to format the timestamp on query
  },
});

/***Schema Settings**

This will not be a model, but rather used as the `reaction` field's subdocument schema in the `Thought` model.*/

module.exports = reactionSchema;
