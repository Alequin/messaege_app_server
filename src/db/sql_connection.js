
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

module.exports = new SqlConnection();
