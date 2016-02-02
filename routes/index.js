/**
 * Created by briansmith on 01/10/15.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('main_index.jade');
});

router.get('/roundOfGolf', function(req, res) {
    res.render('roundOfGolf.jade');
});

router.get('/nearbyGolfCourses', function(req, res){
    res.render('golfCourseMap.jade');
});

module.exports = router;
