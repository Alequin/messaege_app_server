
var FCM = require('fcm-node');
var serverKey = require(process.env.FIREBASE_KEY);
var fcm = new FCM(serverKey);

function Notification(userToken, title, body){
  this.userToken = userToken;
  this.title = title;
  this.body = body;
}

Notification.prototype.send = function(){
  var note = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: this.userToken,
    notification: {
      title: this.title,
      body: this.body
    }
  }

  console.log("before fcm send");

  fcm.send(note, function(err, response){
    if (err) {
      console.log("im here loose");
    } else {
      console.log("im here win");
    }
  });
}

module.exports = Notification;
