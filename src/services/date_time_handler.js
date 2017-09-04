
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

DateTimeHandler.getDateString = function(date){

  const year = date.getFullYear();

  let month = (date.getMonth()+1).toString();
  if(month.length === 1){
    month = "0" + month;
  }
  let day = date.getDate().toString();
  if(day.length === 1){
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;
}

module.exports = DateTimeHandler;
