
const SQL = require("./../db/sql_connection");

function Message(body, userId, conversationId, sentTimestamp){
  this.id = -1;
  this.body = body;
  this.conversationId = conversationId;
  this.sentTimestamp = sentTimestamp;
}

Message.tableName = "messages"

Message.prototype.save = function(){

  const sql = {
    command: `INSERT INTO ${Message.tableName}
    (message_body, user_id, conversation_id, sent_timestamp)
    VALUES ($1, $2, $3, $4)
    RETURNING id;`,
    values: [this.body, this.user_id, this.conversation_id, this.sentTimestamp]
  }

  const onError = (error) => {
    console.log(error);
  }
  const onSuccess = (result) => {
    this.id = result.rows[0].id
    console.log("saved message: ", result.rows);
  }

  SQL.connect(sql, onError, onSuccess);
}

Message.all = function(onError, onSuccess){
  const sql = {command: `SELECT * FROM ${Message.tableName};`}
  SQL.connect(sql, onError, onSuccess);
}

Message.deleteAll = function(){
  const sql = {command: `DELETE FROM ${Message.tableName};`}
  return SQL.runSimpleCommand(sql, `Deleted all from ${Message.tableName}`)
}

module.exports = Message;
