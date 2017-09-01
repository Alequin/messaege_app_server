const express = require('express');
const messageRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const Messages = require("./../src/models/message");

messageRouter.get('/', requestAuth, function(req, res){
  const onError = (error) => {console.log(error.stack)}
  Messages.all(onError, (results) => {
    res.json(results);
  });
});

messageRouter.post('/', requestAuth, function(req, res){
  
});

messageRouter.get('/conversation/:id', requestAuth, function(req, res){
  const onError = (error) => {console.log(error.stack)}
  const convoId = req.params.id;
  Messages.getAllFromConversation(convoId, onError, (results) => {
    res.json(results);
  });
});

module.exports = messageRouter;
