const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");

//  POST /api/comments  -  Creates a new comment
router.post("/comments", (req, res, next) => {
  const { title, description, postId } = req.body;

  Comment.create({ title, description, post: postId })
    .then((newComment) => {
      return Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/comments/:commentId  - Retrieves a specific comment by id
router.get("/comments/:commentId", (req, res, next) => {
  const { commentId } = req.params;

  Comment.findById(commentId)
    .then((comment) => res.json(comment))
    .catch((error) => res.json(error));
});

// PUT  /api/comments/:commentId  - Updates a specific comment by id
router.put("/comments/:commentId", (req, res, next) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Comment.findByIdAndUpdate(commentId, req.body, { new: true })
    .then((updatedComment) => res.json(updatedComment))
    .catch((err) => res.json(err));
});

//  DELETE /api/comments/:commentId  - Deletes a specific comment by id
router.delete("/comments/:commentId", (req, res, next) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Comment.findByIdAndRemove(commentId)
    .then(() =>
      res.json({ message: `Comment with ${commentId} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
