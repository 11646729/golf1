/**
 * Created by briansmith on 01/10/15
 */
module.exports = function(io) {
    var r = require('rethinkdb'),
        assert = require('assert'),
        express = require('express'),
        router = express.Router(),
        util = require('../middleware/utilities'),
        config = require('../config'),
        request = require('request'),
        user = require('../passport/user');

    var connection;

    /*
     * Home page
     */
    router.get(config.routes.home, function(req, res) {
        res.render('home.jade', {title: 'Home'});
    });

    /**
     * Register
     */
    router.get(config.routes.register, function(req, res) {
        res.render('register.jade', {title: 'Register', message: req.flash('error')});
    });

    /**
     * Register posted values
     */
    router.post(config.routes.registerProcess, function(req, res){
        if (req.body.username && req.body.password)
        {
            user.addUser(req.body.username, req.body.password, config.crypto.workFactor, function(err, profile){
                if (err) {
                    req.flash('error', err);
                    res.redirect(config.routes.register);
                }else{
                    req.login(profile, function(){
                        res.redirect(config.routes.mainPage);
                    });
                }
            });
        }else{
            req.flash('error', 'Please fill out all the fields');
            res.redirect(config.routes.register);
        }
    });

    /*
     * Login page
     */
    router.get(config.routes.login, function(req, res) {
        res.render('login.jade', {title: 'Login', message: req.flash('error')});
    });

    /**
     * Logout page
     */
    router.get(config.routes.logout, function(req, res) {
        util.logOut(req);
        res.redirect(config.routes.home);
    });

    /**
     * About
     */
    router.get(config.routes.about, [util.requireAuthentication], function(req, res) {
        res.render('about.jade', {title: 'About Page'});
    });

    /**
     * Contact
     */
    router.get(config.routes.contact, [util.requireAuthentication], function(req, res) {
        res.render('contact.jade', {title: 'Contact Page'});
    });

    /**
     * Main page
     */
    router.get(config.routes.mainPage, [util.requireAuthentication], function(req, res) {
        res.render('mainPage.jade', {title: 'Index'});
    });

    /*
     * Get initial values of Nearby Golf Courses
     */
    router.get(config.routes.nearbyGolfCourses, [util.requireAuthentication], function(req, res) {

        res.render('nearbyGolfCourses.jade', {title: 'Nearby Golf Courses'});

        io.on('connection', function () {

            r.connect({host: config.rethinkdb.host, port: config.rethinkdb.port}, function (err, conn) {

                if (err) {
                    console.log("[ERROR] %s:%s \n%s", err.name, err.msg, err.message);
                    res.send([]);
                }

                connection = conn;

                r.db(config.rethinkdb.db).table(config.rethinkdb.tables.nearbyGolfCourses).run(connection, function (err, cursor) {
                    cursor.toArray(function (err, nearbyGolfCoursesData) {
                        io.emit('loadNearbyGolfCoursesData', nearbyGolfCoursesData);
                    });
                });

                if(this.conn)
                {
                    this.conn.close();
                    console.log('Database connection closed');
                }
            });
        });
    });

    /**
     * TODO
     * Get update values of Nearby Golf Courses
     */


    /*
     * Get initial values of Round Of Golf
     */
    router.get(config.routes.roundsOfGolf, [util.requireAuthentication], function(req, res) {

        res.render('roundsOfGolf.jade', {title: 'Round of Golf'});

        io.on('connection', function () {

            r.connect({host: config.rethinkdb.host, port: config.rethinkdb.port}, function (err, conn) {

                if (err) {
                    console.log("[ERROR] %s:%s \n%s", err.name, err.msg, err.message);
                    res.send([]);
                }

                connection = conn;

                r.db(config.rethinkdb.db).table(config.rethinkdb.tables.roundOfGolf).run(connection, function (err, cursor) {
                    cursor.toArray(function (err, roundOfGolfData) {
                        io.emit('loadRoundOfGolfData', roundOfGolfData);
                    });
                });

                if (this.conn) {
                    this.conn.close();
                    console.log('Database connection closed');
                }
            });
        });
    });

    /**
     * TODO
     * Get update values of Round Of Golf
     */

    /**
     * Course Scorecards
     */
    router.get(config.routes.courseScorecards, [util.requireAuthentication], function(req, res) {
        res.render('courseScorecards.jade', {title: 'Course Scorecards Page'});
    });

    /**
     * Read Competitions
     */
    router.get(config.routes.readCompetitions, [util.requireAuthentication], function(req, res) {

        request(config.googleCalendarUrl, function(err, resp, body){

/*
            body = JSON.parse(body);

            const noEvents = "Number of events: " + body.items.length;

            for(var i=0; i<noEvents; i++) {
                var bookedBy = "Booked by : " + body.items[i].creator.displayName;
                var startTimeEvents = "Start time : " + body.items[i].start.dateTime;
                var endTimeEvents = "End time : " + body.items[i].end.dateTime;
                var descriptionEvents = "Description :" + body.items[i].description;
            }

            var calendarEvents = [];
            calendarEvents.push(body.items[0]);
            calendarEvents.push(body.items[1]);
            console.log(calendarEvents);
*/
            console.log('Access token = ' + config.accessVar);

            var User = function(fname, lname, phone) {
                this.FirstName = fname;
                this.LastName = lname;
                this.Phone = phone;
            };

            var users = [];

            users.push(new User('Matt', 'Palmerlee', '818-123-4567'));
            users.push(new User('Joe', 'Plumber', '310-012-9876'));
            users.push(new User('Tom', 'Smith', '415-567-2345'));

            res.render('users', {'users':users, 'title':'Users'});

            //res.send(body.items);
//            res.render('readCompetitions.jade', {title: 'Competitions Page', calendarNoEvents: noEvents, calendarBookedBy: bookedBy});
        });
    });

    /**
     * Read Competitions with google-calendar npm module
     */
    router.get(config.routes.readGCCompetitions, [util.requireAuthentication], function(req, res) {
            res.render('readGCCompetitions.jade', {title: 'Read Competitions google-calendar Page'});
    });

    /**
     * Add Competitions with google-calendar npm module
     */
    router.get(config.routes.addGCCompetitions, [util.requireAuthentication], function(req, res) {
            res.render('addGCCompetitions.jade', {title: 'Add Competitions gooogle-calendar Page'});
    });

        return router;
};
