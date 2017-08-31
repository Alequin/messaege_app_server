
const SQL = require("./../db/sql_connection");
const User = require("./user");

function Conversation(creationDate){
  this.id = -1;
  this.creationDate = creationDate;
}

Conversation.tableName = "conversations";

Conversation.prototype.save = function(){

  const sql = {
    command: `INSERT INTO ${Conversation.tableName}
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

  SQL.connect(sql, onError, onSuccess);
}

Conversation.findAll = function(onError, onSuccess){
  const sql = {command: `SELECT * FROM ${Conversation.tableName};`}
  SQL.connect(sql, onError, onSuccess);
}

Conversation.deleteAll = function(){
  const sql = {command: `DELETE FROM ${Conversation.tableName};`}
  return SQL.runSimpleCommand(sql, `Deleted all from ${Conversation.tableName}`)
}

Conversation.findUsersOf = function(id, onError, onSuccess){
  const sql = {
    command: `SELECT users.* FROM participants INNER JOIN users ON
    participants.user_id = users.id WHERE participants.conversation_id = $1;`,
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

  SQL.connect(sql, onError, preOnSuccess);
}

module.exports = Conversation;
