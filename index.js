var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var pg = require('pg');

var FCM = require('fcm-node')
var serverKey = require('./fcmclient-d1e8a-firebase-adminsdk-00quu-015a8c3f2e') //put the generated private key path here
var fcm = new FCM(serverKey)

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/testMessage', function(request, response) {
  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: 'cDQhiF_mOJw:APA91bF9Tg-GmtjNPCNBjVfC08a6y5QCgJuc50RO12KEuj55x9HuqXvDV8CYCaLySi-1ZJCVW_ejBtiHyoG8Tq8wdXRUxR5YFyjB-tZ9P1hdhwvbkOMp-tAl93kkj2jMctNN3hOgYW4f',
    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    }
  }

  fcm.send(message, function(err, response){
      if (err) {
        response.send("Something has gone wrong!");
      } else {
        response.send("Successfully sent with response: " + response);
      }
  });

});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/times', function(request, response) {
    var result = ''
    console.log("Debug: ", process.env.TIMES);
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
      result += i + ' ';
  response.send(result);
});

app.get('/db', function (request, response) {
  // https://node-postgres.com/guides/upgrading
  var pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL
  });

  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query('SELECT * FROM another', (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        response.send(res);
      }
      done();
    });
  });
});



// app.get('/db', function (request, response) {
//
//   var client = new pg.Client(process.env.DATABASE_URL + "/test_table");
//   pg.defaults.ssl = true;
//   client.connect();
//
//   var query = client.query("SELECT * FROM test_table");
//   console.log("xox----------------------", query);
//   response.send(query);
//   client.end();
// });

// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.send(result); }
//     });
//   });
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
