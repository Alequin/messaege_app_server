const Conversation = require("./../../models/conversation");

function buildConversations(array){
  array.push(new Conversation("2017-01-01"));

  for(let convo of array) convo.save();
}

module.exports = buildConversations
