var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var sql = require("./src/db/sql_connection");

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send('home')
});

app.get('/db', function (request, response) {

  sql.connect((client, done) => {
    client.query('SELECT * FROM test;', (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        response.send(res);
      }
      done();
    });
  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
