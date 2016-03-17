/**
 * Created by briansmith on 17/03/2016.
 */

var MongoClient = require('mongodb').MongoClient,
//    ObjectId = require('mongodb').ObjectID,
    assert = require('assert'),
    express = require('express'),
    router = express.Router();

// Connection URL
var url = 'mongodb://mytest1:mytest2@ds063168.mlab.com:63168/winedb';
var coll = 'wines';
var testDoc = {
    "address" : {
        "street" : "2 Avenue",
        "zipcode" : "10075",
        "building" : "1480",
        "coord" : [ -73.9557413, 40.7720266 ]
    },
    "borough" : "Manhattan",
    "cuisine" : "Italian",
    "grades" : [
        {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
        },
        {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
        }
    ],
    "name" : "Vella",
    "restaurant_id" : "41704620"
};

/**
 * Function to add document to collection
 */
var insertDocument = function(db, callback) {
    db.collection(coll).insertOne(testDoc, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the " + coll + " collection.");
        callback();
    });
};

/**
 * Function to findAllWines
 */
var findAllWines = function(db, callback) {
    var cursor = db.collection(coll).find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

/**
 * Insert a document
 */
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
        db.close();
    });
});

/**
 * Find all documents
 */
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findAllWines(db, function() {
        db.close();
    });
});

module.exports = router;
