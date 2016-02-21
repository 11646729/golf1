/**
 * Created by briansmith on 01/10/15.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
//    res.render('main_index.jade', {title: 'Index', csrfToken: req.csrfToken() });
    res.render('login.jade', {title: 'Login', csrfToken: req.csrfToken() });
});

router.get('/nearbyGolfCourses', function(req, res){
    res.render('golfCourseMap.jade', {title: 'Nearby Golf Courses', csrfToken: req.csrfToken() });
});

router.get('/roundOfGolf', function(req, res) {
    res.render('roundOfGolf.jade', {title: 'Round of Golf', csrfToken: req.csrfToken() });
});

module.exports = router;
