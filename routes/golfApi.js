/**
 * Created by briansmith on 17/03/2016.
 */

var express = require('express'),
    router = express.Router(),
    db = require('../middleware/db'),
    config = require('../config');
//    util = require('../middleware/utilities'),
//    user = require('../passport/user');

var coll = 'myRoundsOfGolf';
//var coll = 'wines';

/**
 * Fetch all rounds of golf
 */
router.get(config.routes.findMyRounds, function(req, res) {
    db.get().collection(coll).find({}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }

//        res.json(docs);

        if(docs.count > 0){
            // Test routine
            docs.forEach(function (doc) {
                console.log(" key: " + doc._id);
            });
        } else {
            console.log(' Error - record count in database collection = 0');
        }
    });

//    res.render('databaseTest.jade', {title: 'Index'});
});

/**
 * Insert a round of golf
 */
router.get(config.routes.addMyRound, function(req, res) {
    res.render('databaseTest.jade', {title: 'Index'});
});

module.exports = router;
