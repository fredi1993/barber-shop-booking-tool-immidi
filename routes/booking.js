const Booking = require('../models/bookModel');


exports.addBooking = function (request, response) {



    var duplicateBooking = checkDateTimeDuplication(request.query.date, request.query.time);

    duplicateBooking.then(function (result) {


        if (result != null) {

            response.json({
                message: "Duplicate entry"
            });
        } else {

            const new_booking = new Booking(request.query);


            new_booking.save().then(function (new_booking) {

                response.json({
                    message: "New booking successfully added!",
                    new_booking
                });
            });

        }
    }, function (err) {
        console.log(err);
    });

};


exports.getBookings = function (request, response) {


    Booking.find(function (err, bookings) {
        if (err) {
            response.send({
                "message": "error"
            });
        } else {

            response.send(bookings);
        }
    });
    // .remove().exec();

};


function checkDateTimeDuplication(date, time) {


    // Return new promise 
    return new Promise(function (resolve, reject) {
        // Do async job
        Booking.findOne({
            'date': date,
            'time': time
        }, '', function (err, booking) {

            if (err) {
                reject(err);
            } else {
                resolve(booking);
            }
        });

    })
}

var errHandler = function (err) {
    console.log(err);
}