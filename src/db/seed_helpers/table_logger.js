const Conversation = require("./../../models/conversation");
const User = require("./../../models/user");
const Participant = require("./../../models/participant");
const Message = require("./../../models/message");

const onError = (err) => {console.log("error")}
let timeToWait = require("./wait_time_counter")(250);

module.exports = function(){
  setTimeout(() => {
    const onSuccessConversation = (results) => {console.log("Returned conversations: ", results.rows)}
    Conversation.all(onError, onSuccessConversation);
  }, timeToWait());

  setTimeout(() => {
    const onSuccessUsers = (results) => {console.log("Returned Users: ", results.rows)}
    User.all(onError, onSuccessUsers);
  }, timeToWait());

  setTimeout(() => {
    const onSuccessParticipants = (results) => {console.log("Returned participants: ", results.rows)}
    Participant.all(onError, onSuccessParticipants);
  }, timeToWait());

  setTimeout(() => {
    const onSuccessMessage = (results) => {console.log("Returned messages: ", results.rows)}
    Message.all(onError, onSuccessMessage);
  }, timeToWait());
}
