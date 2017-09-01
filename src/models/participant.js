
const SQL = require("./../db/sql_connection");
const TABLES = require("./../db/tables");

function Participant(userId, conversationId){
  this.id = -1;
  this.userId = userId;
  this.conversationId = conversationId;
}

Participant.prototype.save = function(){

  const sql = {
    command: `INSERT INTO ${TABLES.participant}
    (user_id, conversation_id)
    VALUES ($1, $2) RETURNING id;`,
    values: [this.userId,this.conversationId]
  }

  const onError = (error) =>{
    console.log(error);
  }
  const onSuccess = (result) => {
    this.id = result.rows[0].id
    console.log("saved participant: ", result.rows);
  }

  return SQL.connect(sql, onError, onSuccess);
}

Participant.map = function(options){
  const newParticipant = new Participant(options.user_id, options.conversation_id);
  newParticipant.id = options.id;
  return newParticipant;
}

Participant.all = function(onError, onSuccess){
  const sql = {command: `SELECT * FROM ${TABLES.participant};`}
  SQL.connect(sql, onError, onSuccess);
}

Participant.all = function(onError, onSuccess){
  const sql = {command: `SELECT * FROM ${TABLES.participant};`}

  const preOnSuccess = (result) => {
    const participants = SQL.mapResults(result, Participant.map)
    onSuccess(participants);
  }

  SQL.connect(sql, onError, preOnSuccess);
}

Participant.deleteAll = function(){
  const sql = {command: `DELETE FROM ${TABLES.participant};`}
  return SQL.runSimpleCommand(sql, `Deleted all from ${TABLES.participant}`)
}

module.exports = Participant;
