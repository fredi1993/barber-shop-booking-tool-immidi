var express = require('express');
var booking = require('./routes/booking');
var app = express();
var config = require('./config/default');
var mongoose = require('mongoose');

mongoose.connect(config.DBHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    //console.log("we're connected!");
});


app.get('/', booking.getBookings);
app.get('/add', booking.addBooking);



var server = app.listen(3000, () => {
    console.log("Listening on port " + server.address().port + " ...");
});

module.exports = server;