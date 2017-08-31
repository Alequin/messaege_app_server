
const SQL = require("./../db/sql_connection");
const Participant = require("./participant");

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

Conversation.findParticipantsOf = function(id, onError, onSuccess){
  const sql = {
    command: `SELECT * FROM participants WHERE conversation_id = $1`,
    values: [id]
  }

  const preOnSuccess = (result) => {
    const table = result.rows;
    const participants = [];
    for(let row of table){
      participants.push(Participant.map(row));
    }
    onSuccess(participants);
  }

  SQL.connect(sql, onError, preOnSuccess);
}

module.exports = Conversation;
