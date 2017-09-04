
const TABLES = require("./../db/tables");
const Conversation = require("./conversation");
const SQL = require("./../db/sql_connection");

function ConversationInfo(conversationId, usersCollection){
  this.conversationId = conversationId;
  this.usersCollection = usersCollection;
}

ConversationInfo.getAllInfoAllConversation = function(onError, onSuccess){

  const sql = {
    command:
      `SELECT ${TABLES.conversations}.id, ${TABLES.users}.name FROM
      ${TABLES.conversations} INNER JOIN ${TABLES.participants}
      ON ${TABLES.conversations}.id = ${TABLES.participants}.conversation_id
      INNER JOIN ${TABLES.users} ON participants.user_id = ${TABLES.users}.id;`
  }

  const preOnSuccess = (contents) => {

    const gatheredUsers = {};
    for(let content of contents.rows){
      if(!gatheredUsers[content.id]) gatheredUsers[content.id] = [];
      gatheredUsers[content.id].push(content.name);
    }

    const convoInfoCollection = [];
    for(let gatheredUsersKey of Object.keys(gatheredUsers)){
      convoId = gatheredUsersKey;
      convoUsers = gatheredUsers[gatheredUsersKey];
      convoInfoCollection.push(new ConversationInfo(convoId, convoUsers));
    }
    onSuccess(convoInfoCollection);
  }

  SQL.connect(sql, onError, preOnSuccess);
}

ConversationInfo.getAllInfoAllConversation = function(onError, onSuccess){

  //TODO - REFACTOR

  const sql = {
    command:
      `SELECT ${TABLES.conversations}.id, ${TABLES.users}.name FROM
      ${TABLES.conversations} INNER JOIN ${TABLES.participants}
      ON ${TABLES.conversations}.id = ${TABLES.participants}.conversation_id
      INNER JOIN ${TABLES.users} ON participants.user_id = ${TABLES.users}.id;`
  }

  const preOnSuccess = (contents) => {

    const gatheredUsers = {};
    for(let content of contents.rows){
      if(!gatheredUsers[content.id]) gatheredUsers[content.id] = [];
      gatheredUsers[content.id].push(content.name);
    }

    const convoInfoCollection = [];
    for(let gatheredUsersKey of Object.keys(gatheredUsers)){
      convoId = gatheredUsersKey;
      convoUsers = gatheredUsers[gatheredUsersKey];
      convoInfoCollection.push(new ConversationInfo(convoId, convoUsers));
    }
    onSuccess(convoInfoCollection);
  }

  SQL.connect(sql, onError, preOnSuccess);
}

ConversationInfo.getAllConversationInfoForUser = function(userId, onError, onSuccess){

  //TODO - REFACTOR

  const sql = {
    command:
      `SELECT ${TABLES.conversations}.id, ${TABLES.users}.id AS user_id, ${TABLES.users}.name FROM
      ${TABLES.conversations} INNER JOIN ${TABLES.participants}
      ON ${TABLES.conversations}.id = ${TABLES.participants}.conversation_id
      INNER JOIN ${TABLES.users} ON participants.user_id = ${TABLES.users}.id;`
  }

  const preOnSuccess = (contents) => {

    const gatheredUsersIds = {};
    const gatheredUsersNames = {};
    for(let content of contents.rows){
      if(contents.user_id !== userId){
        if(!gatheredUsersNames[content.id]){
          gatheredUsersIds[content.id] = [];
          gatheredUsersNames[content.id] = [];
        }
        gatheredUsersIds[content.id].push(content.user_id);
        gatheredUsersNames[content.id].push(content.name);
      }
    }

    console.log(gatheredUsersIds);
    console.log(gatheredUsersNames);

    const convoInfoCollection = [];
    for(let gatheredUsersKey of Object.keys(gatheredUsersNames)){
      if(gatheredUsersIds[gatheredUsersKey].includes(userId)){
        convoId = gatheredUsersKey;
        convoUsers = gatheredUsersNames[gatheredUsersKey];
        convoInfoCollection.push(new ConversationInfo(convoId, convoUsers));
      }
    }
    onSuccess(convoInfoCollection);
  }

  SQL.connect(sql, onError, preOnSuccess);
}

module.exports = ConversationInfo;
