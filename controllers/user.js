const express = require('express');
const userRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const User = require("./../src/models/user");
const onError = (error) => {console.log(error.stack)}

userRouter.get('/', requestAuth, function(req, res, next){
  User.all(onError, (results) => {
    res.json(results)
  });
});

userRouter.post('/', requestAuth, function(req, res, next){
  const userHash = req.body.user;
  const newUser = new User(
    userHash.name, userHash.avatar,
    userHash.deviceSystem, userHash.deviceToken,
    userHash.onlineStatus, userHash.isVisible
  );

  newUser.save().then(() => {
    User.all(onError, (results) => {
      res.json(newUser);
    });
  });
});

userRouter.get('/online', requestAuth, function(req, res, next){
  User.getVisiblyOnline(onError, (results) => {
    res.json(results)
  });
});

module.exports = userRouter;
