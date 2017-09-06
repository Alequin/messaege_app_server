const express = require('express');
const participantsRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const Participant = require("./../src/models/participant");

const onError = (error) => {console.log(error.stack)}

participantsRouter.post('/user/:id1/conversation/:id2', requestAuth, function(req, res, next){
  const userId = req.params.id1;
  const convoId = req.params.id2;
  const newParticipant = new Participant(userId, convoId);
  newParticipant.save().then(() => {
    res.json({result: "success"})
  });
});

module.exports = participantsRouter;
