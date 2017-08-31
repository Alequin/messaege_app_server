const Participant = require("./../../models/participant");

function buildParticipants(array, users, conversations){

  array.push(new Participant(users[0].id, conversations[0].id));
  array.push(new Participant(users[1].id, conversations[0].id));

  for(let participant of array) participant.save();
}

module.exports = buildParticipants;
