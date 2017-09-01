
const SQL = require("./../db/sql_connection");
const User = require("./user");
const TABLES = require("./../db/tables");

function Conversation(creationDate){
  this.id = -1;
  this.creationDate = creationDate;
}

Conversation.prototype.save = function(){

  const sql = {
    command: `INSERT INTO ${TABLES.conversations}
    (creation_date) VALUES ($1)
    RETURNING id;`,
    values: [this.creationDate]
  }

  const onError = (error) => {
    console.log(error);
  }
  const onSuccess = (result) => {
    this.id = result.rows[0].id
    console.log("saved conversation: ", result.rows);
  }

  return SQL.connect(sql, onError, onSuccess);
}

Conversation.map = function(options){
  const newConvo = new Conversation(options.creation_date);
  newConvo.id = options.id;
  return newConvo;
}

Conversation.all = function(onError, onSuccess){
  const sql = {command: `SELECT * FROM ${TABLES.conversations};`}
  Conversation.selectQuery(onError, onSuccess, sql);
}

Conversation.getAllForUser = function(userId, onError, onSuccess){
  const sql = {
    command: `SELECT conversations.* FROM ${TABLES.conversations} INNER JOIN participants
              ON conversations.id = participants.conversation_id
              WHERE user_id = $1;`,
    values: [userId]
    }
  Conversation.selectQuery(onError, onSuccess, sql);
}

Conversation.selectQuery = function(onError, onSuccess, sql){
  const preOnSuccess = (result) => {
    const convos = SQL.mapResults(result, Conversation.map)
    onSuccess(convos);
  }
  SQL.connect(sql, onError, preOnSuccess);
}

Conversation.deleteAll = function(){
  const sql = {command: `DELETE FROM ${TABLES.conversations};`}
  return SQL.runSimpleCommand(sql, `Deleted all from ${TABLES.conversations}`)
}

Conversation.findUsersOf = function(id, onError, onSuccess){
  const sql = {
    command: `SELECT ${TABLES.users}.* FROM ${TABLES.participants} INNER JOIN ${TABLES.users} ON
    ${TABLES.participants}.user_id = users.id WHERE ${TABLES.participants}.conversation_id = $1;`,
    values: [id]
  }

  const preOnSuccess = (result) => {
    const table = result.rows;
    const users = [];
    for(let row of table){
      users.push(User.map(row));
    }
    onSuccess(users);
  }

  return SQL.connect(sql, onError, preOnSuccess);
}

module.exports = Conversation;
