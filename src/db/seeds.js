const Conversation = require("./../models/conversation");
const buildConversations = require("./seed_helpers/conversation_seeds");
const User = require("./../models/user");
const buildUsers = require("./seed_helpers/user_seeds");
const Participant = require("./../models/Participant");
const buildParticipants = require("./seed_helpers/participant_seeds");
const Message = require("./../models/message");
const buildMessages = require("./seed_helpers/message_seeds");
const logTables = require("./seed_helpers/table_logger");

const convos = [];
const users = [];
const participants = [];
const messages = [];

let promise = Participant.deleteAll();

promise = promise.then(() => {return User.deleteAll()});
promise = promise.then(() => {return Conversation.deleteAll()});
promise = promise.then(() => {return Message.deleteAll()});
promise = promise.then(() => {return buildConversations(convos)});
promise = promise.then(() => {console.log('built convo ----------------------------------------')});
promise = promise.then(() => {return buildUsers(users)});
promise = promise.then(() => {console.log('built users ----------------------------------------')});
promise = promise.then(() => {return buildParticipants(participants, users, convos)});
promise = promise.then(() => {console.log('built participant ----------------------------------------')});
promise = promise.then(() => {return buildMessages(messages, convos)});
promise = promise.then(() => {console.log('built messages ----------------------------------------')});
promise = promise.then(logTables);
