var Request = require("request");
const Booking = require('../models/bookModel');
var mongoose = require('mongoose');
const assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
server = require("../app");



// Describe our tests
describe('Bookings', function () {


    // beforeEach((done) => { //Before each test we empty the database
    //     Booking.find(function (err, bookings) {

    //         done();
    //     }).remove().exec();

    // });



    /*
     * Test the /GET route
     */
    describe('/GET bookings', () => {
        it('it should GET all bookings', (done) => {

            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    //res.body.length.should.be.eql(0);
                    done();
                });

        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST bookings', () => {

        it('it should POST a new booking ', (done) => {


            let new_booking = {
                date: '05/03/2018',
                time: '12:30-13:00',
                client_id: '10235ax',
                service: 'Simple Haircut',
                notes: 'Test',
            };


            chai.request(server)
                .get('/add')
                .query(new_booking)
                .end((err, res) => {


                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('New booking successfully added!');
                    new_booking.should.have.property('date');
                    new_booking.should.have.property('time');
                    new_booking.should.have.property('client_id');
                    new_booking.should.have.property('service');
                    done();
                });
        });

        it('it should not POST a duplicate booking ', (done) => {


            let new_booking = {
                date: '05/03/2018',
                time: '11:00-11:30',
                client_id: '10235ax',
                service: 'Simple Haircut',
                notes: 'Test',
            };

            chai.request(server)
                .get('/add')
                .query(new_booking)
                .end((err, res) => {

                    //console.log("mbrapa ",res,'testkjh');
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Duplicate entry');
                    new_booking.should.have.property('date');
                    new_booking.should.have.property('time');
                    new_booking.should.have.property('client_id');
                    new_booking.should.have.property('service');
                    done();
                });
        });
    });
});