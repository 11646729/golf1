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
    db.get().collection(coll).find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }

        // This works fine now
        //intlen = docs[0].features.length;
        //console.log(intlen); // Gives length of 30

        var strTeam = "", i = 0;

        for (i = 0; i < docs[0].features.length;) {
            strTeam = strTeam + "<li>" + docs[0].features[i].properties.name + "</li>";
            i = i + 1;
        }

        strTeam = "<ul>" + strTeam + "</ul>";

        console.log(strTeam);

        res.send(strTeam);

        //res.writeHead(200, {
        //    'Content-Type': 'text/html'
        //});
        //res.write(template.build("Test web page on node.js", "Hello there", "<p>The teams in Group for Euro 2012 are:</p>" + strTeam));
        //res.end();

        //res.json(docs[0].features[0].properties.name); // This outputs "Ardglass Golf Club" - iterate on features to get all names

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
