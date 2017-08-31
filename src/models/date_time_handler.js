
function DateTimeHandler(){}

DateTimeHandler.validateFormat = function(dateTimeStamp){

  let dateChecker;
  if(dateTimeStamp.length > 10){
    dateChecker = /^\d\d\d\d\-\d\d\-\d\d\s\d\d:\d\d:\d\d\.\d\d\d\d\d\d\+\d\d$/
  }else{
    dateChecker = /^\d\d\d\d\-\d\d\-\d\d$/
  }

  return dateChecker.exec(dateTimeStamp).length === 1
}

module.exports = DateTimeHandler;
