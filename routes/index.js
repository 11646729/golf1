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
//    res.render('home.jade', {title: 'Home', csrfToken: req.csrfToken()});
});

/*
 * Login page
 */
router.get('/login', function(req, res){
    res.render('login.jade', {title: 'Login'});
//    res.render('login.jade', {title: 'Login', csrfToken: req.csrfToken()});
});

/*
 * Login results
 */
router.post('/loginProcess', function(req, res){
    var isAuth = util.auth(req.body.username, req.body.password, req.secret);

    console.log("Body: " + req.body.username);
    console.log("Secret: " + req.secret);
    console.log(isAuth);
    console.log(res.locals.token);

    if (isAuth){
        res.redirect('/mainPage');
//    } else {
//        res.flash('error', 'Wrong Username or Password');
//        res.redirect('/login');
    }
});

/**
 * Logout page
 */
router.get('/logout', function(req, res){
//    util.logOut(req.session);
    res.redirect('/');
});

/**
 * Main page
 */
router.get('/mainPage', function(req, res){
    res.render('mainPage.jade', {title: 'Index'});
//    res.render('mainPage.jade', {title: 'Index', csrfToken: req.csrfToken()});
});

/*
 * Nearby golf courses
 */
router.get('/nearbyGolfCourses', function(req, res){
    res.render('golfCourseMap.jade', {title: 'Nearby Golf Courses'});
//    res.render('golfCourseMap.jade', {title: 'Nearby Golf Courses', csrfToken: req.csrfToken()});
});

/*
 * Round of golf
 */
router.get('/roundOfGolf', function(req, res) {
    res.render('roundOfGolf.jade', {title: 'Round of Golf'});
//    res.render('roundOfGolf.jade', {title: 'Round of Golf', csrfToken: req.csrfToken()});
});

/*
 * Round of golf with Google Maps
 */
router.get('/roundOfGolfGoogle', function(req, res) {
    res.render('roundOfGolfGoogle.jade', {title: 'Index'});
//    res.render('roundOfGolfGoogle.jade', {title: 'Index', csrfToken: req.csrfToken()});
});

module.exports = router;
