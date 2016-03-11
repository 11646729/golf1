/**
 * Created by briansmith on 01/10/15.
 */
var express = require('express');
var util = require('../middleware/utilities');
var router = express.Router();

/*
 * Home page
 */
router.get('/', function(req, res) {
    res.render('home.jade', {title: 'Home'});
});

/*
 * Login page
 */
router.get('/login', function(req, res){
    res.render('login.jade', {title: 'Login', message: req.flash('error')});
});

/*
 * Login results
 */
router.post('/loginProcess', function(req, res){
    var isAuth = util.auth(req.body.username, req.body.password, req.secret);
    if (isAuth){ // isAuth is true
        res.redirect('/mainPage');
    } else {
        req.flash('error', 'Wrong Username or Password');
        res.redirect('/login');
    }
});

/**
 * Logout page
 */
router.get('/logout', function(req, res){
    util.logOut(req.session);
    res.redirect('/');
});

/**
 * Main page
 */
router.get('/mainPage', function(req, res){
    res.render('mainPage.jade', {title: 'Index'});
});

/*
 * Nearby golf courses
 */
router.get('/nearbyGolfCourses', function(req, res){
    res.render('golfCourseMap.jade', {title: 'Nearby Golf Courses'});
});

/*
 * Round of golf
 */
router.get('/roundOfGolf', function(req, res) {
    res.render('roundOfGolf.jade', {title: 'Round of Golf'});
});

/*
 * Round of golf with Google Maps
 */
router.get('/roundOfGolfGoogle', function(req, res) {
    res.render('roundOfGolfGoogle.jade', {title: 'Index'});
});

module.exports = router;
