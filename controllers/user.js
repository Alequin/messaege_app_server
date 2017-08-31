const express = require('express');
const userRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const User = require("./../src/models/user");

userRouter.get('/', requestAuth, function(req, res, next){
  const onError = (error) => {console.log(error.stack)}
  User.findAll(onError, (results) => {
    res.json(results)
  });
});

module.exports = userRouter;
