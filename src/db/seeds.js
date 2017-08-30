const Conversation = require("./../models/conversation");
const User = require("./../models/user");

Conversation.deleteAll();

const convo1 = new Conversation("2017-01-01");
convo1.save();

const user1 = new User("cool Name", 5, "android", "sfhfee", "online", true);
user1.save();
