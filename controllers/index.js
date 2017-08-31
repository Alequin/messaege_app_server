var express = require('express');
var router = new express.Router();
var path = require("path");

router.get('/', function(req, res){
  res.send("Home route");
});

module.exports = router;
