
var FCM = require('fcm-node');
var serverKey = require(process.env.FIREBASE_KEY); //put the generated private key path here
var fcm = new FCM(serverKey);

function Notification(userToken, notification){
  this.userToken = userToken;
  this.notification = notification;
}

Notification.prototype.send = function(){
  var note = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: this.userToken,
    notification: this.notification
  }

  fcm.send(note, function(err, response){
    if (err) {
      response.send("Something has gone wrong!");
    } else {
      response.send("Successfully sent with response: " + response);
    }
  });
}

module.exports = Notification;
