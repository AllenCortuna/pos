// Current Date
var curDate = new Date();
var dd = String(curDate.getDate()).padStart(2, "0");
var mm = String(curDate.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = curDate.getFullYear();
export default curDate = yyyy + "-" + mm + "-" + dd;
