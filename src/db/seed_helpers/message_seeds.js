const Message = require("./../../models/message");
const Participant = require("./../../models/participant");
const Conversation = require("./../../models/conversation");

function buildMessages(array, convos){

  const onError = (error) => {
    console.log(error.stack)
  }

  let events = []

  let event1 = new Promise((resolve, reject) => {
    Conversation.findUsersOf(convos[0].id, onError, (users) => {

      let promiseArray = [];
      let tempArray = [];

      tempArray.push(new Message("hello", users[0].id, convos[0].id, "2017-08-31 14:00:00"));
      tempArray.push(new Message("how are you?", users[1].id, convos[0].id, "2017-08-31 14:00:30"));
      tempArray.push(new Message("im fine thanks", users[0].id, convos[0].id, "2017-08-31 14:01:00"));

      for(var message of tempArray) promiseArray.push(message.save());
      array = array.concat(tempArray);

      Promise.all(promiseArray).then(()=> {
        resolve();
      });
    })
  });

  let event2 = new Promise((resolve, reject) => {
    Conversation.findUsersOf(convos[1].id, onError, (users) => {

      let promiseArray = [];
      let tempArray = [];

      tempArray.push(new Message("bacon and eggs", users[0].id, convos[1].id, "2017-08-31 14:00:00"));
      tempArray.push(new Message("yes i enjoy that", users[1].id, convos[1].id, "2017-08-31 14:00:30"));
      tempArray.push(new Message("wow me two", users[0].id, convos[1].id, "2017-08-31 14:01:00"));
      tempArray.push(new Message("And me three", users[2].id, convos[1].id, "2017-08-31 14:01:30"));

      for(var message of tempArray) promiseArray.push(message.save());
      array = array.concat(tempArray);

      Promise.all(promiseArray).then(()=> {
        resolve();
      });
    })
  });

  events.push(event1);
  events.push(event2);

  return Promise.all(events);
}

module.exports = buildMessages;
