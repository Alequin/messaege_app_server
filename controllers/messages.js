const express = require('express');
const messageRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const Message = require("./../src/models/message");
const Conversation = require("./../src/models/conversation");

const onError = (error) => {console.log(error.stack)}

messageRouter.get('/', requestAuth, function(req, res){
  Message.all(onError, (results) => {
    res.json(results);
  });
});

messageRouter.post('/', requestAuth, function(req, res){
  const messageHash = req.body.message
  const message = new Message(
    messageHash.messageBody,
    messageHash.userId,
    messageHash.conversationId,
    messageHash.sentTimestamp
  );
  message.save().then(() => {
    return Conversation.findUsersOf(message.conversationId, onError, (users) => {
      for(var user of users){
        console.log(user)
      }
    });
  }).then(() => {
    res.json({
      result: message
    });
  });
});

messageRouter.get('/conversation/:id', requestAuth, function(req, res){
  const onError = (error) => {console.log(error.stack)}
  const convoId = req.params.id;
  Message.getAllFromConversation(convoId, onError, (results) => {
    res.json(results);
  });
});

module.exports = messageRouter;
