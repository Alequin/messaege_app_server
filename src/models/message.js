
const SQL = require("./../db/sql_connection");

function Message(body, userId, conversationId, sentTimestamp){
  this.id = -1;
  this.body = body;
  this.userId = userId;
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
    values: [this.body, this.userId, this.conversationId, this.sentTimestamp]
  }

  const onError = (error) => {
    console.log(error);
  }
  const onSuccess = (result) => {
    this.id = result.rows[0].id
    console.log("saved message: ", result.rows);
  }

  return SQL.connect(sql, onError, onSuccess);
}

Message.map = function(options){
  const newMessage = new Message(
    options.message_body, options.user_id,
    options.conversation_id, options.sent_timestamp
  );
  newMessage.id = options.id;
  return newMessage;
}

Message.all = function(onError, onSuccess){
  const sql = {command: `SELECT * FROM ${Message.tableName};`}
  Message.selectQuery(onError, onSuccess, sql);
}

Message.getAllFromConversation = function(convoId, onError, onSuccess){
  const sql = {
    command: `SELECT * FROM ${Message.tableName}
    WHERE conversation_id = $1
    ORDER BY sent_timestamp;`,
    values: [convoId]
  }
  Message.selectQuery(onError, onSuccess, sql);
}

Message.selectQuery = function(onError, onSuccess, sql){
  const preOnSuccess = (result) => {
    const messages = SQL.mapResults(result, Message.map)
    onSuccess(messages);
  }
  SQL.connect(sql, onError, preOnSuccess);
}

Message.deleteAll = function(){
  const sql = {command: `DELETE FROM ${Message.tableName};`}
  return SQL.runSimpleCommand(sql, `Deleted all from ${Message.tableName}`)
}

module.exports = Message;
