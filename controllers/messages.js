const express = require('express');
const messageRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const Message = require("./../src/models/message");

messageRouter.get('/', requestAuth, function(req, res){
  const onError = (error) => {console.log(error.stack)}
  Message.all(onError, (results) => {
    res.json(results);
  });
});

messageRouter.post('/', requestAuth, function(req, res){
  const message = Message.map(req.body.message);
  message.save().then(() => {
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
