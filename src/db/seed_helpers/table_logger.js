const Conversation = require("./../../models/conversation");
const User = require("./../../models/user");
const Participant = require("./../../models/Participant");

const onError = (err) => {console.log("error")}
let timeToWait = require("./wait_time_counter")(250);

module.exports = function(){
  setTimeout(() => {
    const onSuccessConversation = (results) => {console.log("Returned conversations: ", results.rows)}
    Conversation.findAll(onError, onSuccessConversation);
  }, timeToWait());

  setTimeout(() => {
    const onSuccessUsers = (results) => {console.log("Returned Users: ", results.rows)}
    User.findAll(onError, onSuccessUsers);
  }, timeToWait());

  setTimeout(() => {
    const onSuccessParticipants = (results) => {console.log("Returned participants: ", results.rows)}
    Participant.findAll(onError, onSuccessParticipants);
  }, timeToWait());
}
