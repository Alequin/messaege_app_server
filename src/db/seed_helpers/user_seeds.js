const User = require("./../../models/user");

function buildUsers(array){
  array.push(new User("cool Name", 5, "android", "sfhfee", "online", true));
  array.push(new User("awesome popper", 5, "android", "sfhfee", "online", true));
  array.push(new User("wow fan", 5, "android", "sfhfee", "online", true));
  array.push(new User("cam pan", 5, "android", "sfhfee", "offline", true));

  let arr = [];
  for(let user of array) arr.push(user.save());

  return Promise.all(arr);
}

module.exports = buildUsers;
