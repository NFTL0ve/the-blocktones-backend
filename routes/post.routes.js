const router = require("express").Router();

//const { get, default: mongoose } = require("mongoose");
const mongoose = require('mongoose');

const Post = require('../models/Post.model');


//  POST /api/posts  -  Creates a new post
router.post('/posts', (req, res, next) => {
  const { name, text, postId } = req.body;
  const newPost = {
    name,
    text,
    postId: postId
  };

  Post.create(newPost)

    .then(response=> res.json(response))
    .catch(err =>
      {console.log("error creating a new post...", err);
       res.status(500).json({
        message: "error creating post",
        error: err
    })});
});


//get
router.get('/posts', (req, res, next) => {
  Post.find()
    .then(allPosts => res.json(allPosts))
    .catch(err =>
      {console.log("error getting list of posts...", err);
       res.status(500).json({
        message: "error getting list of posts",
        error: err
    })});
});



//get post id


router.get('/posts/:postId', (req, res, next) => 
{
  const { postId } = req.params;

  if(!mongoose.Types.ObjectId.isValid(postId)){
    res.status(400).json({ message: "Specified id is not valid"})
    return;
  }

Post.findById(postId)
.populate('posts')
.then(post => res.json(post))
.catch(err => {
  console.log("error getting post details...", err);
  res.status(500).json({
    message: "error getting post details...",
    error: err
  })
})

})

// PUT  /api/posts/:postsId  -  Updates a specific post by id
router.put('/posts/:postId', (req, res, next) => {
  const { postId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Post.findByIdAndUpdate(postId, req.body, { new: true })
    .then((updatedPost) => res.json(updatedPost))
    .catch(error => res.json(error));
});



// DELETE  /api/posts/:postId  -  Deletes a specific post by id
router.delete('/posts/:postId', (req, res, next) => {
  const { postId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
    
  }
 
  Post.findByIdAndRemove(postId)
    .then(() => res.json({ message: `Post with ${postId} is removed successfully.` }))
    .catch(error => res.json(error));
});





module.exports = router;