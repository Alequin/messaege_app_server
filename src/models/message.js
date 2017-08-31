
const SQL = require("./src/db/sql_connection");

function Message(id, body, userId, conversationId, sentTimestamp){
  this.id = id;
  this.body = body;
  this.conversationId = conversationId;
  this.sentTimestamp = sentTimestamp;
}

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
    console.log("saved conversation: ", result.rows);
  }

  SQL.connect(sql, onError, onSuccess);
}
