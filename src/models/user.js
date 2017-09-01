
const SQL = require("./../db/sql_connection");
const TABLES = require("./../db/tables");

function User(name, avatar, deviceSystem, deviceToken, onlineStatus, isVisible){
  this.id = -1;
  this.name = name;
  this.avatar = avatar;
  this.deviceSystem = deviceSystem
  this.deviceToken = deviceToken
  this.onlineStatus = onlineStatus
  this.isVisible = isVisible
}

User.prototype.save = function(){

  const sql = {
    command: `INSERT INTO ${TABLES.users}
    (name, avatar, device_system, device_token, online_status, is_visible)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`,
    values: [
      this.name, this.avatar, this.deviceSystem,
      this.deviceToken, this.onlineStatus, this.isVisible
    ]
  }

  const onError = (error) =>{
    console.log(error);
  }
  const onSuccess = (result) => {
    this.id = result.rows[0].id
    console.log("saved user: ", result.rows);
  }

  return SQL.connect(sql, onError, onSuccess);
}

User.map = function(options){
  const newUser = new User(
    options.name, options.avatar, options.device_system,
    options.device_token,options.online_status, options.is_visible
  );
  newUser.id = options.id;
  return newUser;
}

User.all = function(onError, onSuccess){
  const sql = {command: `SELECT * FROM ${TABLES.users};`}
  User.selectQuery(onError, onSuccess, sql)
}

User.getOnline = function(onError, onSuccess){
  const sql = {
    command: `SELECT * FROM ${TABLES.users} WHERE online_status = $1;`,
    values: ["online"]
  }
  User.selectQuery(onError, onSuccess, sql)
}

User.getVisiblyOnline = function(onError, onSuccess){
  const sql = {
    command: `SELECT * FROM ${TABLES.users} WHERE online_status = $1 AND is_visible = $2;`,
    values: ["online", true]
  }
  User.selectQuery(onError, onSuccess, sql)
}

User.selectQuery = function(onError, onSuccess, sql){
  const preOnSuccess = (result) => {
    const users = SQL.mapResults(result, User.map)
    onSuccess(users);
  }
  SQL.connect(sql, onError, preOnSuccess);
}

User.deleteAll = function(){
  const sql = {command: `DELETE FROM ${TABLES.users};`}
  return SQL.runSimpleCommand(sql, `Deleted all from ${TABLES.users}`)
}

module.exports = User;
