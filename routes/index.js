/**
 * Created by briansmith on 01/10/15.
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

/*
 * Login results
 */
router.post(config.routes.loginProcess, function(req, res){
    var isAuth = util.auth(req.body.username, req.body.password, req.secret);
    if (isAuth){ // isAuth is true
        res.redirect(config.routes.mainPage);
    } else {
        req.flash('error', 'Wrong Username or Password');
        res.redirect(config.routes.login);
    }
});

/**
 * Logout page
 */
router.get(config.routes.logout, function(req, res){
    util.logOut(req.session);
    res.redirect(config.routes.home);
});

/**
 * Main page
 */
router.get(config.routes.mainPage, function(req, res){
    res.render('mainPage.jade', {title: 'Index'});
});

/*
 * Nearby golf courses
 */
router.get(config.routes.nearbyGolfCourses, function(req, res){
    res.render('nearbyGolfCourses.jade', {title: 'Nearby Golf Courses'});
});

/*
 * Round of golf
 */
router.get(config.routes.roundOfGolf, function(req, res) {
    res.render('roundOfGolf.jade', {title: 'Round of Golf'});
});

/*
 * Round of golf with Google Maps
 */
router.get(config.routes.roundOfGolfGoogle, function(req, res) {
    res.render('roundOfGolfGoogle.jade', {title: 'Index'});
});

module.exports = router;
