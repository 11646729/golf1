/**
 * Created by briansmith on 17/03/2016.
 */

var express = require('express'),
    router = express.Router(),
    db = require('../middleware/db'),
    config = require('../config');
//    util = require('../middleware/utilities'),
//    user = require('../passport/user');

//var coll = 'myRoundsOfGolf';
//var coll = 'wines';
var coll = "golfCourses";

/**
 * Fetch all rounds of golf
 */
router.get(config.routes.findMyRounds, function(req, res) {

    //db.get().createCollection("nearbyGolfCoursesTest");

    db.get().collection(coll).find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }

        // This sends the Json file to the client
        res.json(docs);

        //// This routine sends the data to the html page
        //var strTeam = "", i = 0;
        //
        //// docs[0].features.length here is 30
        //for (i = 0; i < docs[0].features.length;) {
        //    strTeam = strTeam + "<li>" + docs[0].features[i].properties.name + "</li>";
        //    i = i + 1;
        //}
        //
        //strTeam = "<ul>" + strTeam + "</ul>";
        //
        //res.send(strTeam);

//        res.render("databaseTest.jade", {
//            docs: docs
//        });
    });
});

/**
 * Insert a round of golf
 */
router.get(config.routes.addMyRound, function(req, res) {
    res.render('databaseTest.jade', {title: 'Index'});
});

module.exports = router;
