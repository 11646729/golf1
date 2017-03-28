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
        user = require('../passport/user'),
        gcal = require('google-calendar');

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

        request(config.googleCalendarUrl, function(err, resp, eventList){

/*
            eventList = JSON.parse(eventList);

            const noEvents = "Number of events: " + eventList.items.length;

            for(var i=0; i<noEvents; i++) {
                var bookedBy = "Booked by : " + eventList.items[i].creator.displayName;
                var startTimeEvents = "Start time : " + eventList.items[i].start.dateTime;
                var endTimeEvents = "End time : " + eventList.items[i].end.dateTime;
                var descriptionEvents = "Description :" + eventList.items[i].description;
            }
*/

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

        var google_calendar = new gcal.GoogleCalendar(config.googleOAuth2AccessToken);

        google_calendar.events.list(config.calendarId, {'timeMin': new Date().toISOString()}, function(err, eventList){
            if(err){
                res.send(500, err);
            }
            else{
                eventList = JSON.stringify(eventList);
                const noEvents = eventList;

//                const noEvents = "Number of events: " + eventList.items.length;

                for(var i=0; i<noEvents; i++) {
                    var bookedBy = "Booked by : " + eventList.items[i].creator.displayName;
                    var startTimeEvents = "Start time : " + eventList.items[i].start.dateTime;
                    var endTimeEvents = "End time : " + eventList.items[i].end.dateTime;
                    var descriptionEvents = "Description :" + eventList.items[i].description;
                }

            res.render('readCompetitions.jade', {title: 'Read Competitions google-calendar Page', calendarNoEvents: noEvents, calendarBookedBy: bookedBy});
            }
        });
    });

    /**
     * Add Competitions with google-calendar npm module
     */
    router.get(config.routes.addGCCompetitions, [util.requireAuthentication], function(req, res) {

        var google_calendar = new gcal.GoogleCalendar(config.googleOAuth2AccessToken);

        var addEventBody = {
            'status': 'confirmed',
            'summary': 'Constructed calendar test - summary',
            'description': 'Constructed calendar test - description',
            'organizer': {
                'email': config.calendarId,
                'self': true
            },
            'start': {
                'dateTime': '2017-04-06T12:15:00+01:00'
            },
            'end': {
                'dateTime': '2017-04-06T13:15:00+01:00'
            }
        };

        google_calendar.events.insert(config.calendarId, addEventBody, function(addEventError, addEventResponse){

            console.log('GOOGLE RESPONSE:', addEventError, addEventResponse);

            if(addEventError){
                res.send(400, addEventError);
            } else {
//                res.send(200, addEventResponse);
            }
        });

        res.render('addGCCompetitions.jade', {title: 'Add Competitions google-calendar Page'});
    });

        return router;
};
