const User = require("./../../models/user");

function buildUsers(array){
  array.push(new User("cool Name", 5, "android", "sfhfee", "online", true));
  array.push(new User("awesome popper", 5, "android", "sfhfee", "online", true));
  array.push(new User("wow fan", 5, "android", "sfhfee", "online", true));

  for(let user of array) user.save();
}

module.exports = buildUsers;
