var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser());
// app.use(require("./controllers/index.js"));

app.get('/', function(req, res, next){
  res.send("Home route");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
