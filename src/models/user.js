
const SQL = require("./../db/sql_connection");

function User(name, avatar, deviceSystem, deviceToken, onlineStatus, privacyStatus){
  this.id = -1;
  this.avatar = avatar;
  this.deviceSystem = deviceSystem
  this.deviceToken = deviceToken
  this.onlineStatus = onlineStatus
  this.privacyStatus = privacyStatus
}

User.prototype.save = function(){

  const command = "";

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

User.deleteAll = function(){
  const tableName = "users"

  const command = "DELETE FROM " + tableName + ";"

  SQL.connect((client, done) => {
    client.query(command, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("deleted all from " + tableName);
      }
      done();
    });
  });
}

module.exports = Conversation;
