
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

  SQL.connect((client, done) => {
    client.query(command, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        this.id = res.rows[0].id
        console.log("saved: ", res.rows);
      }
      done();
    });
  });
}

Conversation.deleteAll = function(){
  const command = `DELETE FROM ${Conversation.tableName};`

  SQL.connect((client, done) => {
    client.query(command, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("deleted all from conversations");
      }
      done();
    });
  });
}

module.exports = Conversation;
