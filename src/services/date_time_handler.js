
function DateTimeHandler(){}

DateTimeHandler.validateFormat = function(dateTimeStamp){

  let dateChecker;
  if(dateTimeStamp.length > 10){
    dateChecker = /^\d\d\d\d\-\d\d\-\d\d\s\d\d:\d\d:\d\d$/
  }else{
    dateChecker = /^\d\d\d\d\-\d\d\-\d\d$/
  }

  return dateChecker.exec(dateTimeStamp).length === 1
}

DateTimeHandler.getDateString = function(date){

  const year = date.getFullYear();

  let month = (date.getMonth()+1).toString();
  month = formatValue(month);

  let day = date.getDate().toString();
  day = formatValue(day);

  return year + "-" + month + "-" + day;
}

DateTimeHandler.getDateTimeString = function(date){

  const dateString = DateTimeHandler.getDateString(date);

  let hours = (date.getHours()).toString();
  hours = formatValue(hours);

  let minutes = (date.getMinutes()).toString();
  minutes = formatValue(minutes);

  let seconds = (date.getSeconds()).toString();
  seconds = formatValue(seconds);

  return dateString + " " + hours + ":" + minutes + ":" + seconds;
}

function formatValue(strNumber){

  if(strNumber.length === 1){
    strNumber = "0" + strNumber;
  }

  return strNumber;
}

module.exports = DateTimeHandler;
