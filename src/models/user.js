
const SQL = require("./../db/sql_connection");

function User(name, avatar, deviceSystem, deviceToken, onlineStatus, privacyStatus){
  this.id = -1;
  this.avatar = avatar;
  this.deviceSystem = deviceSystem
  this.deviceToken = deviceToken
  this.onlineStatus = onlineStatus
  this.privacyStatus = privacyStatus
}

User.tableName = "users";

User.prototype.save = function(){

  const command = `INSERT INTO ${User.tableName}
  (name, avatar, device_system, device_token, online_status, privacy_status)
  VALUES ('${this.name}',${this.avatar},'${this.deviceSystem}','${this.deviceToken}',
  '${this.onlineStatus}',${this.privacyStatus}) RETURNING id;`

  SQL.connect((client, done) => {
    client.query(command, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        this.id = res.rows[0].id
        console.log("saved user: ", res.rows);
      }
      done();
    });
  });
}

User.deleteAll = function(){

  const command = "DELETE FROM " + User.tableName + ";"

  SQL.connect((client, done) => {
    client.query(command, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("deleted all from " + User.tableName);
      }
      done();
    });
  });
}

module.exports = User;
