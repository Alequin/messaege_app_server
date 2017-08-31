const Conversation = require("./../models/conversation");
const buildConversations = require("./seed_helpers/conversation_seeds");
const User = require("./../models/user");
const buildUsers = require("./seed_helpers/user_seeds");
const Participant = require("./../models/Participant");
const buildParticipants = require("./seed_helpers/participant_seeds");
const logTables = require("./seed_helpers/table_logger");

let timeToWait = require("./seed_helpers/wait_time_counter")();

setTimeout(() => {Participant.deleteAll();}, timeToWait());
setTimeout(() => {User.deleteAll();}, timeToWait());
setTimeout(() => {Conversation.deleteAll();}, timeToWait());

const convos = [];
setTimeout(() => {buildConversations(convos);}, timeToWait());

const users = [];
setTimeout(() => {buildUsers(users);}, timeToWait());

const participants = [];
setTimeout(() => {buildParticipants(participants, users, convos);}, timeToWait());

logTables();
