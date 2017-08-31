const Message = require("./../../models/message");
const Participant = require("./../../models/participant");
const Conversation = require("./../../models/conversation");

function buildMessages(array, convos){

  const onError = (error) => {
    console.log(error.stack)
  }

  const convoId = convos[0].id;

  return new Promise((resolve, reject) => {
    Conversation.findUsersOf(convoId, onError, (users) => {

      var arr = [];

      array.push(new Message("hello", users[0].id, convoId, "2017-08-31 14:00:00.123456+00"));
      array.push(new Message("how are you?", users[1].id, convoId, "2017-08-31 14:00:30.123456+00"));
      array.push(new Message("im fine thanks", users[0].id, convoId, "2017-08-31 14:01:00.123456+00"));
      for(var message of array) arr.push(message.save());

      Promise.all(arr).then(()=> {
        resolve();
      });
    })
  });



}

module.exports = buildMessages;
