/**
 * Created by briansmith on 17/03/2016.
 */

var express = require('express'),
    router = express.Router(),
    db = require('../middleware/db'),
    config = require('../config'),
    ObjectID = require('mongodb').ObjectID;
//    util = require('../middleware/utilities'),
//    user = require('../passport/user');

//NB Format for GeoJSON is Longitude then Latitude : "coordinates": [ -5.683992, 54.625605 ]
//NB Format for Google maps: is Latitude then Longitude : new google.maps.LatLng(54.625605, -5.683992)

//var coll = 'myRoundsOfGolf';
var coll = 'wines';
//var coll = "golfCourses";


/**
 * Fetch all rounds of golf
 */
router.get(config.routes.findMyRounds, function(req, res) {

    db.get().collection(coll).find().toArray(function(err, docs) {
        if (err) {
            console.log(err);
//            return;
        } else {
            console.log('Retrieving all documents: ' + docs.length);

            // This sends the Json file to the client
            res.json(docs);

//            res.render("databaseTest.jade", {
//                docs: docs
//            });
        }
    });
});

/**
 * Fetch a round of golf by id
 */
router.get(config.routes.findMyRoundById, function(req, res) {

    // This is test data
    var id = "52e6b265f831a1a3d8814470";
    //var id = req.params.id;

    var obj_id = new ObjectID(id);

    db.get().collection(coll).find({ _id: obj_id }).toArray(function(err, docs) {
        if (err) {
            console.log(err);
//            return;
        } else {
            console.log('Retrieving wine: ' + id);

            // This sends the Json file to the client
            res.json(docs);

//            res.render("databaseTest.jade", {
//                docs: docs
//            });
        }
    });
});


var newRound = {
    name: "TEST OF NEWROUND",
    year: "2009",
    grapes: "Grenache / Syrah",
    country: "France",
    region: "Southern Rhone",
    description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely wine, which makes an excellent complement to fish dishes.",
    picture: "saint_cosme.jpg"
};


/**
 * Insert a round of golf
 */
router.post(config.routes.addMyRound, function(req, res) {
    //var newRound = req.body;
    console.log('Adding round: ' + JSON.stringify(newRound));

    myColl = collection(coll);

    db.get().myColl.insert(newRound, function(err, docs) {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            console.log('Success: ' + JSON.stringify(result[0]));
            res.send(result[0]);
        }

//      res.render('databaseTest.jade', {title: 'Index'});

    });
});


/**
 * Delete a round of golf
 */
router.delete(config.routes.deleteMyRound, function(req, res) {
    var id = req.params.id;
    console.log('Deleting round: ' + id);

    db.get().collection(coll, function(err, docs) {
        docs.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
});


module.exports = router;
