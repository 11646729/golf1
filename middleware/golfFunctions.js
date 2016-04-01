/**
 * Created by briansmith on 20/03/2016.
 */

//var assert = require('assert'),
//    config = require('../config'),
//    db = require('../middleware/db');
//
//var coll = 'myRoundsOfGolf';

/*
 * Get basic shot start and end points
 * http://localhost:3000/golf/allShots
 */
//exports.findAllRounds = function(req, res){
//    db.get().collection(coll).find(function (err, docs) {
//        if (err) {
//            console.log(err);
//            return;
//        }
//
//        docs.forEach(function (doc) {
//            console.log(" key: " + doc._id);
//        });
//    });
//};

/**
 * Insert a round of golf
 */
//exports.addMyRound = function(req, res) {
//    db.get().collection(coll).insertOne(config.myRound, function(err, docs) {
//        assert.equal(err, null);
//        console.log("Inserted a document into the " + coll + " collection.");
//        callback();
//    });
//};