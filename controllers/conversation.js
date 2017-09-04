const express = require('express');
const convoRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");
const DateTimeHandler = require("./../src/services/date_time_handler");

const Convo = require("./../src/models/conversation");
const Participant = require("./../src/models/participant");
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

convoRouter.post("/user/:id1/other_user/:id2", requestAuth, function(req, res, next){
  let date = new Date();
  const convo = new Convo(DateTimeHandler.getDateString(date));

  const id1 = req.params.id1;
  const id2 = req.params.id2;

  convo.save().then(() => {
    let participant1 = new Participant(id1, convo.id);
    let participant2 = new Participant(id2, convo.id);

    participant1.save().then(() => {
      return participant2.save();
    }).then(() => {
      res.json({result: true});
    });
  });
})

module.exports = convoRouter;
