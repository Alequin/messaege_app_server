const express = require('express');
const convoRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const Convos = require("./../src/models/conversation");

convoRouter.get('/', requestAuth, function(req, res, next){
  const onError = (error) => {console.log(error.stack)}
  Convos.all(onError, (results) => {
    res.json(results)
  });
});

convoRouter.get('/user/:id', requestAuth, function(req, res, next){
  const onError = (error) => {console.log(error.stack)}
  const userId = req.params.id;
  Convos.getAllForUser(userId, onError, (results) => {
    res.json(results)
  });
});

module.exports = convoRouter;
