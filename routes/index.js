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
                    req.login(profile, function(err){
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
        res.render('about.jade', {title: 'Index'});
    });

    /**
     * Contact
     */
    router.get(config.routes.contact, [util.requireAuthentication], function(req, res) {
        res.render('contact.jade', {title: 'Index'});
    });

    /**
     * Main page
     */
    router.get(config.routes.mainPage, [util.requireAuthentication], function(req, res) {
        res.render('mainPage.jade', {title: 'Index'});
    });

    /*
     * Nearby golf courses - data from the database
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

                r.db(config.rethinkdb.db).table('golfCourses').run(connection, function (err, cursor) {
                    cursor.toArray(function (err, nearbyGolfCoursesGeoJsonData) {
                        io.emit('nearbyGolfCoursesCoordinates', nearbyGolfCoursesGeoJsonData);
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

    /*
     * Round of golf with Google Maps
     */
    router.get(config.routes.roundOfGolfGoogle, [util.requireAuthentication], function(req, res) {

        res.render('roundOfGolfGoogle.jade', {title: 'Round of Golf'});

        io.on('connection', function () {

            r.connect({host: config.rethinkdb.host, port: config.rethinkdb.port}, function (err, conn) {

                if (err) {
                    console.log("[ERROR] %s:%s \n%s", err.name, err.msg, err.message);
                    res.send([]);
                }

                connection = conn;

                r.db(config.rethinkdb.db).table('golfRound').run(connection, function (err, cursor) {
                    cursor.toArray(function (err, roundOfGolfGeoJsonData) {
                        io.emit('roundOfGolfCoordinates', roundOfGolfGeoJsonData);
                    });
                });

                if (this.conn) {
                    this.conn.close();
                    console.log('Database connection closed');
                }
            });
        });
    });

    /*
     * Round of golf with OpenLayers using Bing Maps
     */
    router.get(config.routes.roundOfGolf, [util.requireAuthentication], function(req, res) {
        res.render('roundOfGolf.jade', {title: 'Round of Golf'});
    });

    return router;
};
