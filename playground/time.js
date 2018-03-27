var moment = require('moment');

//Jan 1st 1970 00:00:00 am => beginning date
//var date = new Date();
//momentjs.com/docs
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
var someTimeStamp = new Date().getTime();
console.log(moment(someTimeStamp));


var date = moment();
date.add(1,'years').subtract(6, 'months');
console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));
