
const SQL = require("./../db/sql_connection");

function Participant(userId, conversationId){
  this.id = -1;
  this.userId = userId;
  this.participantId = participantId;
}

Participant.tableName = "participants";

Participant.prototype.save = function(){

  const command = `INSERT INTO ${Participant.tableName}
  (user_id, conversation_id)
  VALUES (${this.userId},${this.participantId}) RETURNING id;`

  const onError = (error) =>{
    console.log(error);
  }
  const onSuccess = (result) => {
    this.id = result.rows[0].id
    console.log("saved participant: ", result.rows);
  }

  SQL.connect(command, onError, onSuccess);
}

Participant.findAll = function(onError, onSuccess){
  const command = `SELECT * FROM ${Participant.tableName};`
  SQL.connect(command, onError, onSuccess);
}

Participant.deleteAll = function(){
  const command = `DELETE FROM ${Participant.tableName};`
  SQL.runSimpleCommand(command, `Deleted all from ${Participant.tableName}`)
}

module.exports = Participant;
