/**
 * Created by briansmith on 27/04/2016.
 */

// A fork of the Christophe Coenraets's [Node Cellar](https://github.com/ccoenraets/nodecellar)
// sample app using Backbone.js, Twitter Bootstrap, Node.js, Express, and RethinkDB.
//
// See the [GitHub README](https://github.com/rethinkdb/nodecellar-rethinkdb/blob/master/readme.md)
// for details of the complete stack, installation, and running the app.


// This module uses a single database connection which is
// initialized before the app starts serving requests.
// See `server.js` for details.

var r = require('rethinkdb'),
    debug = require('debug')('rdb'),
    assert = require('assert'),
    self = this;

// #### Database setup

/**
 * We initialize the database by performing the following operations:
 *
 * -   create the database `RDB_DB` (defaults to `nodecellar`)
 * using [`dbCreate`](http://www.rethinkdb.com/api/#js:manipulating_databases-db_create)
 * -   create the `wines` table using [`tableCreate`](http://www.rethinkdb.com/api/#js:manipulating_tables-table_create)
 *
 * If the table didn't exist than we populate the table with some sample data using a
 * bulk [`insert`](http://www.rethinkdb.com/api/#js:writing_data-insert).
 *
 * You'd typically not find this code in a real-life app, since the database would already exist.
 */
exports.setupDB = function(dbConfig, connection) {
    // Create the DB using [`dbCreate`](http://www.rethinkdb.com/api/#js:manipulating_databases-db_create):
    r.dbCreate(dbConfig.db).run(connection, function(err, result) {
//        debug("'%s' database created", dbConfig['db']);
        console.log("'%s' database created", dbConfig['db']);

        // Create the Table using [`tableCreate`](http://www.rethinkdb.com/api/#js:manipulating_tables-table_create):
        r.db(dbConfig.db).tableCreate(dbConfig.table).run(connection, function(err, result) {
//            debug("'%s' table created", dbConfig['table']);
            console.log("'%s' table created", dbConfig['table']);
        });
    });
};

/**
 * Retrieve all the documents in the golfCourses table
 * UNTESTED YET
 */
exports.findAll = function(req, res){
    r.table(dbConfig.table).run(self.connection, function(err, cursor){
        cursor.toArray(function(err, results){
            if(err) {
//                debug("[ERROR] %s:%s \n%s", err.name, err.msg, err.message);
                console.log("[ERROR] %s:%s \n%s", err.name, err.msg, err.message);
                res.send([]);
            }
            else {
                res.send(results);
            }
        });
    });
};


