// This routine was copied from stackoverflow on 23/04/17
// then modified for UK format

function getFormattedDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
//  return month + '/' + day + '/' + year;
  return day + '/' + month + '/' + year;
}