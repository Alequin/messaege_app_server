const Conversation = require("./../../models/conversation");
const User = require("./../../models/user");
const Participant = require("./../../models/participant");
const Message = require("./../../models/message");

const onError = (err) => {console.log("error")}

module.exports = function(){

    const onSuccessConversation = (results) => {console.log("Returned conversations: ", results)}
    Conversation.all(onError, onSuccessConversation);

    const onSuccessUsers = (results) => {console.log("Returned Users: ", results)}
    User.all(onError, onSuccessUsers);

    const onSuccessParticipants = (results) => {console.log("Returned participants: ", results)}
    Participant.all(onError, onSuccessParticipants);

    const onSuccessMessage = (results) => {console.log("Returned messages: ", results)}
    Message.all(onError, onSuccessMessage);
}
