
const pg = require('pg');

function SqlConnection(){
  this.connectionString = "postgres://localhost/chat_app";
}

SqlConnection.prototype.connect = function (onConnect) {
  // https://node-postgres.com/guides/upgrading
  var pool = new pg.Pool({
      connectionString: this.connectionString
  });

  pool.connect((err, client, done) => {
    if(err) throw err
    onConnect(client, done);
  });
};

SqlConnection.prototype.runSimpleCommand = function(command, logOutput){
  this.connect((client, done) => {
    client.query(command, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        if(logOutput)console.log(logOutput);
      }
      done();
    });
  });
}

module.exports = new SqlConnection();
