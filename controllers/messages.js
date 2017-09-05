const express = require('express');
const messageRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const Message = require("./../src/models/message");
const MessageInfo = require("./../src/models/message_info");
const Conversation = require("./../src/models/conversation");
const User = require("./../src/models/user");
const Notification = require("./../src/services/notification");
const DateTimeHandler = require("./../src/services/date_time_handler");

const onError = (error) => {console.log(error.stack)}

messageRouter.get('/', requestAuth, function(req, res, next){
  Message.all(onError, (results) => {
    res.json(results);
  });
});

messageRouter.post('/', requestAuth, function(req, res, next){
  const messageHash = req.body.message

  const timeStamp = DateTimeHandler.getDateTimeString(new Date());

  const message = new Message(
    messageHash.messageBody,
    messageHash.userId,
    messageHash.conversationId,
    timeStamp
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
          console.log("making note: ", user.deviceToken);
          let note = new Notification(user.deviceToken, title, body)
          console.log("made note: ", body);
          note.send();
          console.log("sent note")
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
