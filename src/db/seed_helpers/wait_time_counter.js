let prepareTimeToWait = function(){
  let timeToWait = 250;
  return function(){
    let toReturn = timeToWait;
    timeToWait += 250;
    return timeToWait;
  }
}

module.exports = prepareTimeToWait;
