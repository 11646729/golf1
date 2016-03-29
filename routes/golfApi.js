/**
 * Created by briansmith on 17/03/2016.
 */

var express = require('express'),
    router = express.Router(),
//    util = require('../middleware/utilities'),
    config = require('../config');
//    user = require('../passport/user');

/**
 * Fetch all rounds of golf
 */
router.get(config.routes.findMyRounds, function(req, res) {
//    res.render('about.jade', {title: 'Index'});
});

/**
 * Insert a round of golf
 */
router.get(config.routes.addMyRound, function(req, res) {
//    res.render('about.jade', {title: 'Index'});
});

module.exports = router;
