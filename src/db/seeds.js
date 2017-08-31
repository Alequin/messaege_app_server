const Conversation = require("./../models/conversation");
const buildConversations = require("./seed_helpers/conversation_seeds");
const User = require("./../models/user");
const buildUsers = require("./seed_helpers/user_seeds");


let prepareTimeToWait = function(){
  let timeToWait = 250;
  return function(){
    let toReturn = timeToWait;
    timeToWait += 250;
    return timeToWait;
  }
}
let timeToWait = prepareTimeToWait();

User.deleteAll();
Conversation.deleteAll();

const convos = [];
setTimeout(() => {buildConversations(convos);}, timeToWait());

const users = [];
setTimeout(() => {buildUsers(users);}, timeToWait());

setTimeout(() => {

  const onError = (err) => {console.log("error")}

  const onSuccessUsers = (results) => {console.log("Returned Users: ", results.rows)}
  User.findAll(onError, onSuccessUsers);

  const onSuccessConversation = (results) => {console.log("Returned conversations: ", results.rows)}
  Conversation.findAll(onError, onSuccessConversation);

}, timeToWait());
