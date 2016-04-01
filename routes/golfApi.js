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
var coll = 'wines';

router.get(config.routes.findMyRounds, function (req, res) {
    var countries = [1, 2, 3];
    res.render("databaseTest", {
        "countries": countries
    });
});

/**
 * Fetch all rounds of golf
 */
router.get(config.routes.findMyRounds, function(req, res) {
    db.get().collection(coll).find(function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }

        // This works fine
//        docs.forEach(function (doc) {
//            console.log(" key: " + doc._id + " name " + doc.name);
//        });

        //TODO THIS THROWS AN ERROR
        res.render("databaseTest.jade", {
            "docs": docs
        });
    });
});

/**
 * Insert a round of golf
 */
router.get(config.routes.addMyRound, function(req, res) {
    res.render('databaseTest.jade', {title: 'Index'});
});

module.exports = router;
