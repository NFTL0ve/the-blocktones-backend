const router = require("express").Router();

//const { get, default: mongoose } = require("mongoose");
const mongoose = require('mongoose');

const Post = require('../models/Post.model');


//  POST /api/projects  -  Creates a new project
router.post('/post', (req, res, next) => {
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
router.get('/post', (req, res, next) => {
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


router.get('/post/:postId', (req, res, next) => 
{
  const { postId } = req.params;

  if(!mongoose.Types.ObjectId.isValid(postId)){
    res.status(400).json({ message: "Specified id is not valid"})
    return;
  }

Post.findById(postId)
.populate('post')
.then(post => res.json(post))
.catch(err => {
  console.log("error getting post details...", err);
  res.status(500).json({
    message: "error getting post details...",
    error: err
  })
})

})

// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put('/post/:postId', (req, res, next) => {
  const { postId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Post.findByIdAndUpdate(postId, req.body, { new: true })
    .then((updatedPost) => res.json(updatedPost))
    .catch(error => res.json(error));
});



// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete('/post/:postId', (req, res, next) => {
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