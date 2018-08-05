const moment = require('moment');

// Start is Jan 1st 1970 00:00:00 AM UTC
var date = moment();
// date.add(1, 'years');
console.log(date.format('Do MMM, YYYY H:mm:ss:SSS'));
console.log(date.format('Do MMM, YYYY H:mm A'));

var smeTimestamp = moment().valueOf();
console.log(smeTimestamp)