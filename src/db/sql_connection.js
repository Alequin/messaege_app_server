
const pg = require('pg');

function SqlConnection(){
  // this.connectionString = "postgres://localhost/chat_app";
  this.connectionString = process.env.DATABASE_URL;
}

SqlConnection.prototype.connect = function (sql, onFail, onSuccess) {
  // https://node-postgres.com/guides/upgrading
  var pool = new pg.Pool({
      connectionString: this.connectionString
  });

  return pool.connect().then((client) => {
    console.log("out 1 --------------------------------------------------------");
    return client.query(sql.command, sql.values, (err, res) => {
      console.log("out 2 --------------------------------------------------------");
      if (err) {
        onFail(err);
      } else {
        onSuccess(res);
      }
      client.end();
    });
  })
};

SqlConnection.prototype.runSimpleCommand = function(sql, logOutput){
  const onError = (err) => {console.log(err.stack)}
  const onSuccess = (result) => {if(logOutput)console.log(logOutput);}
  return this.connect(sql, onError, onSuccess);
}

SqlConnection.prototype.mapResults = function(results, mapCallBack){
  const table = results.rows;
  const output = [];
  for(let row of table){
    output.push(mapCallBack(row));
  }
  return output;
}

module.exports = new SqlConnection();
