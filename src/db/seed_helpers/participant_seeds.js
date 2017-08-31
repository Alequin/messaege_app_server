const Participant = require("./../../models/participant");

function buildParticipants(array, users){

  array.push(new Participant());

}

module.exports = buildParticipants;
