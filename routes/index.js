/**
 * Created by briansmith on 01/10/15.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('main_index', {title: 'Golf Routines'});
});

router.get('/golfCourseMap', function(req, res) {
    res.render('golfCourseMap');
});

//router.get('/gis', function(req, res){
//    res.render('gis');
//});

module.exports = router;
