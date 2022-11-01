const mongoose= require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
    name: String,
    text: String,
    postId: Number
});

const Post = model('Post', postSchema);
module.exports = Post




