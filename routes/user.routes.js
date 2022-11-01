const router = require("express").Router();


// const mongoose = require('mongoose');

const User = require('../models/User.model');


//  POST /api/user  -  Creates a new user
router.post('/user', (req, res, next) => {
  const { email, password, userId } = req.body;
  const newUser = {
    email,
    password,
    userId: userId
  };

  User.create(newUser)

    .then(response=> res.json(response))
    .catch(err =>
      {console.log("error creating a new user...", err);
       res.status(500).json({
        message: "error creating user",
        error: err
    })});
});

//get
router.get('/user', (req, res, next) => {
  User.find()
    .then(allUsers => res.json(allUsers))
    .catch(err =>
      {console.log("error getting list of users...", err);
       res.status(500).json({
        message: "error getting list of users",
        error: err
    })});
});


//get userId


router.get('/user/:userId', (req, res, next) => 
{
  const { userId } = req.params;

  if(!mongoose.Types.ObjectId.isValid(userId)){
    res.status(400).json({ message: "Specified userId is not valid"})
    return;
  }

User.findById(userId)
.populate('user')
.then(user => res.json(user))
.catch(err => {
  console.log("error getting userId details...", err);
  res.status(500).json({
    message: "error getting userId details...",
    error: err
  })
})
})

// PUT  /api/user/:email  -  Updates a specific project by email
router.put('/user/:userId', (req, res, next) => {
  const { userId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: 'Specified userId is not valid' });
    return;
  }
 
  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch(error => res.json(error));
});





module.exports = router;