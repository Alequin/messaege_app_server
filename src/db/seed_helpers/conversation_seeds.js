const Conversation = require("./../../models/conversation");

function buildConversations(array){
  array.push(new Conversation("2017-01-01"));
  array.push(new Conversation("2017-05-19"));

  let arr = [];
  for(let convo of array) arr.push(convo.save());

  return Promise.all(arr);
}

module.exports = buildConversations
