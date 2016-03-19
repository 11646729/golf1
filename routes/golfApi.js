/**
 * Created by briansmith on 17/03/2016.
 */

var assert = require('assert'),
    express = require('express'),
    router = express.Router(),
    config = require('../config'),
    db = require('../middleware/db');

var coll = 'myRoundsOfGolf';

/*
 * Get basic shot start and end points
 * http://localhost:3000/golf/allShots
 */
router.get(config.routes.findMyRounds, function(req, res) {
//    res.render('about.jade', {title: 'Index'});

// TODO: Move this to a javascript file then call it from the jade file
    db.get().collection(coll).find(function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }

        docs.forEach(function (doc) {
            console.log(" key: " + doc._id);
        });
    });
});

/**
 * Insert shots or a round
 */
router.get(config.routes.addMyRound, function(req, res) {
//    res.render('about.jade', {title: 'Index'});

    console.log('In the ' + coll + ' function');

// TODO: Move this to a javascript file then call it from the jade file
//    db.get().collection(coll).insertOne(config.myRound, function(err, docs) {
//        assert.equal(err, null);
//        console.log("Inserted a document into the " + coll + " collection.");
//        callback();
//    });
});

module.exports = router;
