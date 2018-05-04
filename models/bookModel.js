const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create a Schema and a Model

const BookingSchema = new Schema({
    date: String,
    time: String,
    client_id: String,
    service: String,
    notes: String,
});

const Booking = mongoose.model('booking', BookingSchema);

module.exports = Booking;