const express = require('express');
const participantsRouter = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const onError = (error) => {console.log(error.stack)}

participantsRouter.post('/', requestAuth, function(req, res, next){
  
});

module.exports = participantsRouter;
