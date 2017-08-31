const Conversation = require("./../../models/conversation");

function buildConversations(array){
  array.push(new Conversation("2017-01-01"));

  let arr = [];
  for(let convo of array) arr.push(convo.save());

  return Promise.all(arr);
}

module.exports = buildConversations
