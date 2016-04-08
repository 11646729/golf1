/**
 * Created by briansmith on 17/03/2016.
 */

var express = require('express'),
    router = express.Router(),
    db = require('../middleware/db'),
    config = require('../config');
//    util = require('../middleware/utilities'),
//    user = require('../passport/user');

//NB Format for GeoJSON is Longitude then Latitude : "coordinates": [ -5.683992, 54.625605 ]
//NB Format for Google maps: is Latitude then Longitude : new google.maps.LatLng(54.625605, -5.683992)

// Connection URL
// config.mongoUrl
var MONGODB_URI = 'mongodb://mytest1:mytest2@ds063168.mlab.com:63168/winedb';
// Let’s break down the URI string we passed as the first argument to MongoClient.connect
// mongodb:// is the protocol definition
// <dbuser>: mytest1
// <dbpassword>: mytest2
// winedb is the database we wish to connect to
// Make sure to replace that URI with the one provided by MongoLab

var wineCollection, database;

//var coll = 'myRoundsOfGolf';
var collWines = 'wines';
var coll = "golfCourses";

MongoClient.connect(config.mongoUrl, { server: { auto_reconnect: true } }, function (err, db) {

    // Use connect method to connect to the Server
    //MongoClient.connect(url, function(err, db) {
    //    assert.equal(null, err);
    //    console.log("Connected correctly to server");

    //    db.close();
    //});

    if(err) {
        console.log('Failed to connect to the database provider');
    } else {
        assert.equal(null, err);

        console.log('Connected to winedb database at Mongolab');

        // TODO Check if collection exists - if not then create it
        wineCollection = db.collection(collWines);

        // If collection does not exist then create it and populate it with seed data
        //if(err) {
        //    db.wineCollection.insert(seedData);
        //
        //    wineCollection.count(function(err, count) {
        //        console.log(format("*** Collection has been created and seed data has been added, record count = %s", count));
        //    });
        //// If collection exists
        //} else {
            wineCollection.count(function(err, count) {
                console.log(format('Collection exists and contains %s records', count));

                //// If collection exists but is empty then populate it with seed data
                //if (count==0)
                //{
                //    wineCollection.insert(seedData, function(err) {
                //        if (err) {
                //            console.log('An error occurred when seed data was being added to the wines collection');
                //            db.close();
                //        } else {
                //            wineCollection.count(function(err, count) {
                //                console.log(format('Seed data has been added, record count = %s', count));
                //            });
                //        }
                //    });
                //}
            });
//        }
    }
});





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
