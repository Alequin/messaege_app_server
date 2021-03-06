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

  User.isUserNameTaken(newUser.name, onError, (results) => {
    if(results.length > 0){
      newUser.id = -1;
      res.json(newUser);
    }else{
      newUser.save().then(() => {
        res.json(newUser);
      });
    }
  })
});

userRouter.put('/online_status/:id', requestAuth, function(req, res, next){
  const userId = req.params.id;
  const onlineStatus = req.body.onlineStatus;
  User.updateOnlineStatus(userId, onlineStatus, onError, (results) => {
    res.json({result: "done"});
  });
});

userRouter.get('/online', requestAuth, function(req, res, next){
  User.getVisiblyOnline(onError, (results) => {
    res.json(results)
  });
});

module.exports = userRouter;
