/**
 * Created by briansmith on 01/10/15.
 */
var express = require('express');
var router = express.Router();
var util = require('../middleware/utilities');

/*
 * Home page
 */
router.get('/', function(req, res) {
    res.render('home.jade', {title: 'Index', csrfToken: req.csrfToken() });
});

/*
 * Login page
 */
router.get('/login', function(req, res){
    res.render('login.jade', {title: 'Login', csrfToken: req.csrfToken() });
});

/*
 * Login results
 */
router.post('/loginProcess', function(req, res){
//    console.log(req.body);
//    res.send(req.body.username + " " + req.body.password);
    var isAuth = util.auth(req.body.username, req.body.password, req.secret);
    if (isAuth){
        res.redirect('/mainPage');
    } else {
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
    res.render('main_index.jade', {title: 'Index', csrfToken: req.csrfToken() });
});

/*
 * Nearby golf courses
 */
router.get('/nearbyGolfCourses', function(req, res){
    res.render('golfCourseMap.jade', {title: 'Nearby Golf Courses', csrfToken: req.csrfToken() });
});

/*
 * Round of golf
 */
router.get('/roundOfGolf', function(req, res) {
    res.render('roundOfGolf.jade', {title: 'Round of Golf', csrfToken: req.csrfToken() });
});

/*
 * Round of golf with Google Maps
 */
router.get('/roundOfGolfGoogle', function(req, res) {
    res.render('roundOfGolfGoogle.jade', {title: 'Index', csrfToken: req.csrfToken() });
});

module.exports = router;
