const Conversation = require("./../models/conversation");

Conversation.deleteAll();

const convo1 = new Conversation("2017-01-01");
convo1.save();
