const Participant = require("./../../models/participant");

function buildParticipants(array, users, conversations){

  array.push(new Participant(users[0].id, conversations[0].id));
  array.push(new Participant(users[1].id, conversations[0].id));

  let arr = [];
  for(let participant of array) arr.push(participant.save());

  return Promise.all(arr);
}

module.exports = buildParticipants;
