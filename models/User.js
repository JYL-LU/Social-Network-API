const { Schema, models } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = models("User", userSchema);

module.exports = User;
