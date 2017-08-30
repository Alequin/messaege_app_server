
const SQL = require("./src/db/sql_connection");

function Message(id, body, userId, conversationId, sentTimestamp){
  this.id = id;
  this.body = body;
  this.conversationId = conversationId;
  this.sentTimestamp = sentTimestamp;
}

Message.prototype.save = function(){

  SQL.connect((client, done) => {
    client.query('INSERT INTO ', (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        response.send(res);
      }
      done();
    });
  });

}
