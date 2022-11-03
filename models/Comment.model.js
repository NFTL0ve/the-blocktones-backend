const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  title: String,
  description: String,
  post: { type: Schema.Types.ObjectId, ref: "Post" },
});

module.exports = model("Comment", commentSchema);
