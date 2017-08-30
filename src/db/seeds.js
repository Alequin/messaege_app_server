const Conversation = require("./../models/conversation");
const User = require("./../models/user");

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

const convo1 = new Conversation("2017-01-01");

setTimeout(() => {
  convo1.save();
}, timeToWait());

const user1 = new User("cool Name", 5, "android", "sfhfee", "online", true);

setTimeout(() => {
  user1.save();
}, timeToWait());

setTimeout(() => {
  User.findAll();
  Conversation.findAll();
}, timeToWait());
