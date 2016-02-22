/**
 * Created by briansmith on 01/10/15.
 */
var express = require('express');
var router = express.Router();

/*
 * Home page
 */
router.get('/', function(req, res) {
//    res.render('main_index.jade', {title: 'Index', csrfToken: req.csrfToken() });
    res.render('main_index.jade', {title: 'Index'});});

/*
 * Login page
 */
router.get('/login', function(req, res){
    res.render('login.jade', {title: 'Login', csrfToken: req.csrfToken() });
//    res.render('login.jade', {title: 'Login'});
});

/*
 * Login results
 */
router.post('/loginProcess', function(req, res){
    console.log(req.body);
    res.send(req.body.username + " " + req.body.password);
});

/*
 * Nearby golf courses
 */
router.get('/nearbyGolfCourses', function(req, res){
//    res.render('golfCourseMap.jade', {title: 'Nearby Golf Courses', csrfToken: req.csrfToken() });
    res.render('golfCourseMap.jade', {title: 'Nearby Golf Courses'});
});

/*
 * Round of golf
 */
router.get('/roundOfGolf', function(req, res) {
//    res.render('roundOfGolf.jade', {title: 'Round of Golf', csrfToken: req.csrfToken() });
    res.render('roundOfGolf.jade', {title: 'Round of Golf'});
});

module.exports = router;
