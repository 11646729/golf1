/**
 * Created by briansmith on 17/03/2016.
 */

var r = require('rethinkdb'),
    debug = require('debug')('rdb'),
    assert = require('assert'),
    self = this,

    express = require('express'),
    router = express.Router(),
    config = require('../config');
//    util = require('../middleware/utilities'),
//    user = require('../passport/user');

var connection;

/**
 * Fetch a round of golf by id
 */
//router.get(config.routes.findMyRoundById, function(req, res) {
//
//    // This is test data
//    var id = "52e6b265f831a1a3d8814470";
//    //var id = req.params.id;
//
//    //var obj_id = new ObjectID(id);
//
//    db.get().collection(coll).find({ _id: obj_id }).toArray(function(err, docs) {
//        if (err) {
//            console.log(err);
////            return;
//        } else {
//            console.log('Retrieving wine: ' + id);
//
//            // This sends the Json file to the client
//            res.json(docs);
//
////          res.render("databaseTest.jade", {
////              docs: docs
////          });
//        }
//    });
//});

/**
 * Insert a round of golf
 */
// TODO Change this to router.post
//router.get(config.routes.addMyRound, function(req, res) {
//
//    // This is test data
//    var newRound = {
//        name: 'TEST OF NEWROUND',
//        year: '2009',
//        grapes: 'Grenache / Syrah',
//        country: 'France',
//        region: 'Southern Rhone',
//        description: 'The aromas of fruit and spice give one a hint of the light drinkability of this lovely wine, which makes an excellent complement to fish dishes.',
//        picture: 'saint_cosme.jpg'
//    };
//    //var newRound = req.body;
//
//    db.get().collection(coll).insertOne(newRound, function(err, result){
//        if (err) {
//            res.send({'error':'An error has occurred'});
//        } else {
//            //console.log('Success: _id is ' + ObjectID(result[3]));
//
//            db.get().collection(coll).find().toArray(function(err, docs) {
//                // This sends the Json file to the client
//                res.json(docs);
//            });
//
////          res.render("databaseTest.jade", {
////              docs: docs
////          });
//        }
//    });
//});


/**
 * Delete a round of golf
 */
// TODO Replace get with delete
//router.get(config.routes.deleteMyRound, function(req, res) {
//
//    // This is test data
//    var id = "57097679e14a86ea0317a7e9";
//    // var id = req.params.id;
//
//    var obj_id = new ObjectID(id);
//
//    db.get().collection(coll).removeOne(obj_id, function(err, result) {
//        if (err) {
//            res.send({'error':'An error has occurred'});
//        } else {
//            console.log('' + result + ' document(s) deleted');
//
//            db.get().collection(coll).find().toArray(function(err, docs) {
//                // This sends the Json file to the client
//                res.json(docs);
//            });
//
////          res.render("databaseTest.jade", {
////              docs: docs
////          });
//        }
//    });
//});


module.exports = router;
