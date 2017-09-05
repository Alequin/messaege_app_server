
const TABLES = require("./../db/tables");
const SQL = require("./../db/sql_connection");

function MessageInfo(messageBody, userName, sentTimestamp){
  this.messageBody = messageBody;
  this.userName = userName;
  this.sentTimestamp = sentTimestamp;
}

MessageInfo.map = function(options){
  return new MessageInfo(options.message_body, options.name, options.sent_timestamp);
}

MessageInfo.getAllFromConversation = function(convoId, onError, onSuccess){
  const sql = {
    command:
      `SELECT ${TABLES.messages}.message_body, ${TABLES.users}.name, ${TABLES.messages}.sent_timestamp
      FROM ${TABLES.messages} INNER JOIN ${TABLES.users}
      ON ${TABLES.messages}.user_id = ${TABLES.users}.id
      WHERE conversation_id = $1
      ORDER BY sent_timestamp;`,
    values: [convoId]
  }

  const preOnSuccess = (results) => {
    resultsRows = results.rows;
    results = [];
    for(let resultRow of resultsRows){
      results.push(MessageInfo.map(resultRow));
    }
    onSuccess(results);
  }

  SQL.connect(sql, onError, preOnSuccess);
}

module.exports = MessageInfo;
