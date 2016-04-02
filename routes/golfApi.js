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
        docs.forEach(function (doc) {
            console.log(" key: " + doc._id + " name " + doc.name);
        });

        // But adding this causes a Converting to circular structure to JSON error
        //res.send(docs);

        //TODO THIS THROWS AN ERROR
        //res.render("databaseTest.jade", {
        //    docs: docs
        //});

        // This works fine
        //var letters = [
        //    {letter: "a"},
        //    {letter: "b"},
        //    {letter: "c"}
        //];
        //
        //res.send(letters);

    });
});

/**
 * Insert a round of golf
 */
router.get(config.routes.addMyRound, function(req, res) {
    res.render('databaseTest.jade', {title: 'Index'});
});

module.exports = router;
