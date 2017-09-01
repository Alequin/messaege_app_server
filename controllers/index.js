const express = require('express');
const router = new express.Router();
const requestAuth = require("./../src/services/request_auth");

const Notification = require("./../src/services/notification");

router.use("/users", require("./user"));
router.use("/conversations", require("./conversation"));
router.use("/messages", require("./messages"));

router.get('/', requestAuth, function(req, res, next){
  res.send("Home route");
});

router.get('/test', requestAuth, function(req, res, next){
  // var token = "cDQhiF_mOJw:APA91bF9Tg-GmtjNPCNBjVfC08a6y5QCgJuc50RO12KEuj55x9HuqXvDV8CYCaLySi-1ZJCVW_ejBtiHyoG8Tq8wdXRUxR5YFyjB-tZ9P1hdhwvbkOMp-tAl93kkj2jMctNN3hOgYW4f";
  // var notification = {
  //   title: 'Title of your push notification',
  //   body: 'Body of your push notification'
  // }
  // var x = new Notification(token, notification);
  // x.send();
  res.json({result: "sent"})
});

module.exports = router;
