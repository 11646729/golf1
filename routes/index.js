/**
 * Created by briansmith on 01/10/15
 */

var express = require('express');
var util = require('../middleware/utilities');
var router = express.Router();
var config = require('../config');

/*
 * Home page
 */
router.get(config.routes.home, function(req, res) {
    res.render('home.jade', {title: 'Home'});
});

/*
 * Login page
 */
router.get(config.routes.login, function(req, res){
    res.render('login.jade', {title: 'Login', message: req.flash('error')});
});

/**
 * Logout page
 */
router.get(config.routes.logout, function(req, res){
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
router.get(config.routes.mainPage, [util.requireAuthentication], function(req, res){
    res.render('mainPage.jade', {title: 'Index'});
});

/*
 * Nearby golf courses
 */
router.get(config.routes.nearbyGolfCourses, [util.requireAuthentication], function(req, res){
    res.render('nearbyGolfCourses.jade', {title: 'Nearby Golf Courses'});
});

/*
 * Round of golf with OpenLayers using Bing Maps
 */
router.get(config.routes.roundOfGolf, [util.requireAuthentication], function(req, res) {
    res.render('roundOfGolf.jade', {title: 'Round of Golf'});
});

/*
 * Round of golf with Google Maps
 */
router.get(config.routes.roundOfGolfGoogle, [util.requireAuthentication], function(req, res) {
    res.render('roundOfGolfGoogle.jade', {title: 'Round of Golf'});
});

module.exports = router;
