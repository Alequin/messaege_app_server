let prepareTimeToWait = function(interval){
  let timeToWait = interval;
  return function(){
    let toReturn = timeToWait;
    timeToWait += interval;
    return timeToWait;
  }
}

module.exports = prepareTimeToWait;
