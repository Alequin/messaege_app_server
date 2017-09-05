const express = require('express');
const messageRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const Message = require("./../src/models/message");
const MessageInfo = require("./../src/models/message_info");
const Conversation = require("./../src/models/conversation");
const User = require("./../src/models/user");
const Notification = require("./../src/services/notification");

const onError = (error) => {console.log(error.stack)}

messageRouter.get('/', requestAuth, function(req, res, next){
  Message.all(onError, (results) => {
    res.json(results);
  });
});

messageRouter.post('/', requestAuth, function(req, res, next){
  const messageHash = req.body.message
  const message = new Message(
    messageHash.messageBody,
    messageHash.userId,
    messageHash.conversationId,
    messageHash.sentTimestamp
  );
  let sendingUser;

  User.getById(message.userId, onError, (user) => {
    sendingUser = user;
  }).then(() => {
    return message.save();
  }).then(() => {
    return Conversation.findUsersOf(message.conversationId, onError, (users) => {
      let title = "Message";
      let body = "You have a message from " + sendingUser.name;
      let notes = [];
      for(var user of users){
        if(user.id !== sendingUser.id){
          // let note = new Notification(user.deviceToken, title, body)
          // note.send();
        }
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
  MessageInfo.getAllFromConversation(convoId, onError, (results) => {
    res.json(results);
  });
});

module.exports = messageRouter;
