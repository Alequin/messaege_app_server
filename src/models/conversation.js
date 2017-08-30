
const SQL = require("./../db/sql_connection");

function Conversation(creationDate){
  this.id = -1;
  this.creationDate = creationDate;
}

Conversation.tableName = "conversations";

Conversation.prototype.save = function(){

  const creationDate = "'" + this.creationDate + "'"

  const command =`INSERT INTO ${Conversation.tableName}
  (creation_date) VALUES ('${this.creationDate}')
  RETURNING id`;

  const onError = (error) => {
    console.log(error);
  }
  const onSuccess = (result) => {
    this.id = result.rows[0].id
    console.log("saved conversation: ", result.rows);
  }

  SQL.connect(command, onError, onSuccess);
}

Conversation.findAll = function(callBack){
  const command = `SELECT * FROM ${Conversation.tableName};`
  const onError = (error) =>{
    console.log(error);
  }
  const onSuccess = (result) => {
    console.log("Found all conversations: ", result.rows);
  }
  SQL.connect(command, onError, onSuccess);
}

Conversation.deleteAll = function(){
  const command = `DELETE FROM ${Conversation.tableName};`
  SQL.runSimpleCommand(command, `Deleted all from ${Conversation.tableName}`)
}

module.exports = Conversation;
