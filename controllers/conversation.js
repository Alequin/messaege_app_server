const express = require('express');
const convoRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const Convo = require("./../src/models/conversation");
const ConvoInfo = require("./../src/models/conversation_info");

const onError = (error) => {console.log(error.stack)}

convoRouter.get('/', requestAuth, function(req, res, next){
  Convo.all(onError, (results) => {
    res.json(results)
  });
});

convoRouter.get('/user/:id', requestAuth, function(req, res, next){
  const userId = req.params.id;
  Convo.getAllForUser(userId, onError, (results) => {
    res.json(results)
  });
});

convoRouter.get("/participants/user/:id", requestAuth, function(req, res, next){
  ConvoInfo.getAllConversationInfoForUser(req.params.id, onError, (results) => {
    res.json(results);
  });
});

convoRouter.post("user/:id/other_user/:id", requestAuth, function(req, res, next){
  const convo = new Conversation()
})

module.exports = convoRouter;
