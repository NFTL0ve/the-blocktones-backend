const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "User name is required."],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    userId: {
      type: String,
      required: [true, "user ID is required."],
  },
}
);

const User = model("User", userSchema);

module.exports = User;
