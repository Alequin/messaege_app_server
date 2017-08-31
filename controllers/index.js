const express = require('express');
const router = new express.Router();
const requestAuth = require("./../src/services/request_auth");

router.use("/users", require("./user"));
router.use("/conversations", require("./conversation"));
router.use("/messages", require("./messages"));

router.get('/', requestAuth, function(req, res, next){
  res.send("Home route");
});

module.exports = router;
