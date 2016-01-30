/**
 * Created by briansmith on 01/10/15.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('golfCourseMap', {title: 'Golf Courses'});
});

module.exports = router;
