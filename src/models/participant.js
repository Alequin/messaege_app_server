
const SQL = require("./../db/sql_connection");

function Participant(userId, conversationId){
  this.id = -1;
  this.userId = userId;
  this.conversationId = conversationId;
}

Participant.tableName = "participants";

Participant.prototype.save = function(){

  const sql = {
    command: `INSERT INTO ${Participant.tableName}
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

  SQL.connect(sql, onError, onSuccess);
}

Participant.map = function(options){
  const newParticipant = new Participant(options.user_id, options.conversation_id);
  newParticipant.id = options.id;
  return newParticipant;
}

Participant.findAll = function(onError, onSuccess){
  const sql = {command: `SELECT * FROM ${Participant.tableName};`}
  SQL.connect(sql, onError, onSuccess);
}

Participant.deleteAll = function(){
  const sql = {command: `DELETE FROM ${Participant.tableName};`}
  return SQL.runSimpleCommand(sql, `Deleted all from ${Participant.tableName}`)
}

module.exports = Participant;
