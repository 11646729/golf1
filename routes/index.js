/**
 * Created by briansmith on 01/10/15
 */

module.exports = function(io) {
    var express = require('express'),
        router = express.Router(),
        util = require('../middleware/utilities'),
        config = require('../config'),
        user = require('../passport/user');

    /*
     * Home page
     */
    router.get(config.routes.home, function(req, res) {
        res.render('home.jade', {title: 'Home'});
    });

    /**
     * Register
     */
    router.get(config.routes.register, function(req, res) {
        res.render('register.jade', {title: 'Register', message: req.flash('error')});
    });

    /**
     * Register posted values
     */
    router.post(config.routes.registerProcess, function(req, res){
        if (req.body.username && req.body.password)
        {
            user.addUser(req.body.username, req.body.password, config.crypto.workFactor, function(err, profile){
                if (err) {
                    req.flash('error', err);
                    res.redirect(config.routes.register);
                }else{
                    req.login(profile, function(err){
                        res.redirect(config.routes.mainPage);
                    });
                }
            });
        }else{
            req.flash('error', 'Please fill out all the fields');
            res.redirect(config.routes.register);
        }
    });

    /*
     * Login page
     */
    router.get(config.routes.login, function(req, res) {
        res.render('login.jade', {title: 'Login', message: req.flash('error')});
    });

    /**
     * Logout page
     */
    router.get(config.routes.logout, function(req, res) {
        util.logOut(req);
        res.redirect(config.routes.home);
    });

    /**
     * About
     */
    router.get(config.routes.about, [util.requireAuthentication], function(req, res) {
        res.render('about.jade', {title: 'Index'});
    });

    /**
     * Contact
     */
    router.get(config.routes.contact, [util.requireAuthentication], function(req, res) {
        res.render('contact.jade', {title: 'Index'});
    });

    /**
     * Main page
     */
    router.get(config.routes.mainPage, [util.requireAuthentication], function(req, res) {
        res.render('mainPage.jade', {title: 'Index'});
    });

    /*
     * Nearby golf courses
     */
    router.get(config.routes.nearbyGolfCourses, [util.requireAuthentication], function(req, res) {
        res.render('nearbyGolfCourses.jade', {title: 'Nearby Golf Courses'});

        io.on('connection', function () {
            /**
             * Nearby Golf Courses contained in a GeoJSON variable
             */
            var nearbyGolfCoursesGeoJsonData =
            {
                "type": "FeatureCollection",
                "crs": {
                    "type": "name",
                    "properties": {
                        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                },
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.604549, 54.258716 ]
                        },
                        "properties": {
                            "name": "Ardglass Golf Club",
                            "phoneNumber": "028 44 841 219"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.469174, 54.414666 ]
                        },
                        "properties": {
                            "name": "Ardminnan Golf Club",
                            "phoneNumber": "028 4277 1321"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.968653, 54.565785 ]
                        },
                        "properties": {
                            "name": "Balmoral Golf Club",
                            "phoneNumber": "028 9038 1514"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.654729, 54.659859 ]
                        },
                        "properties": {
                            "name": "Bangor Golf Club",
                            "phoneNumber": "028 9127 0922"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.914224, 54.561471 ]
                        },
                        "properties": {
                            "name": "Belvoir Park Golf Club",
                            "phoneNumber": "028 9049 1693"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.726133, 54.630849 ]
                        },
                        "properties": {
                            "name": "Blackwood Golf Centre",
                            "phoneNumber": "028 9185 2706"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.703048, 54.666202 ]
                        },
                        "properties": {
                            "name": "Carnlea Golf Club",
                            "phoneNumber": "028 9127 0368"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.831853, 54.571461 ]
                        },
                        "properties": {
                            "name": "Castlereagh Hills Golf Club",
                            "phoneNumber": "028 9044 8477"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -6.784519, 55.165779 ]
                        },
                        "properties": {
                            "name": "Castlerock Golf Club",
                            "phoneNumber": "028 7084 8314"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.684562, 54.626163 ]
                        },
                        "properties": {
                            "name": "Clandeboye Golf Club",
                            "phoneNumber": "028 9127 1767"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.953633, 54.625353 ]
                        },
                        "properties": {
                            "name": "Cliftonville Golf Club",
                            "phoneNumber": "028 9074 4158"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.549328,	54.653172 ]
                        },
                        "properties": {
                            "name": "Donaghadee Golf Club",
                            "phoneNumber": "028 9188 3624"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.983643,	54.545321 ]
                        },
                        "properties": {
                            "name": "Dunmurry Golf Club",
                            "phoneNumber": "028 9062 1314"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -6.233941,	54.451971 ]
                        },
                        "properties": {
                            "name": "Edenmore Country Club",
                            "phoneNumber": "028 9261 9241"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -6.312051,	54.855284 ]
                        },
                        "properties": {
                            "name": "Galgorm Castle Golf Club",
                            "phoneNumber": "028 2564 6161"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.738059,	54.668818 ]
                        },
                        "properties": {
                            "name": "Helen's Bay Golf Course",
                            "phoneNumber": "028 9185 2815"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.830112,	54.631174 ]
                        },
                        "properties": {
                            "name": "Holywood Golf Club",
                            "phoneNumber": "028 9042 3135"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.472254, 54.440484 ]
                        },
                        "properties": {
                            "name": "Kirkistown Castle Golf Club",
                            "phoneNumber": "028 4277 1233"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.819143,	54.595872 ]
                        },
                        "properties": {
                            "name": "Knock Golf Club",
                            "phoneNumber": "028 9048 3251"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.643564,	54.498789 ]
                        },
                        "properties": {
                            "name": "Mahee Island Golf Club",
                            "phoneNumber": "028 9754 1234"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.97205, 54.538048 ]
                        },
                        "properties": {
                            "name": "Malone Golf Club",
                            "phoneNumber": "028 9061 2758"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.913676, 54.579967 ]
                        },
                        "properties": {
                            "name": "Ormeau Golf Club",
                            "phoneNumber": "028 9064 0700"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -6.724955, 55.171454 ]
                        },
                        "properties": {
                            "name": "Portstewart Golf Club",
                            "phoneNumber": "028 7083 2015"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.882425, 54.488131 ]
                        },
                        "properties": {
                            "name": "Rockmount Golf Club",
                            "phoneNumber": "028 9081 2279"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -6.635313, 55.199731 ]
                        },
                        "properties": {
                            "name": "Royal Portrush Golf Club",
                            "phoneNumber": "028 7082 2311"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.719557, 54.577895 ]
                        },
                        "properties": {
                            "name": "Scrabo Golf Club",
                            "phoneNumber": "028 9181 2355"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.855763, 54.583079 ]
                        },
                        "properties": {
                            "name": "Shandon Park Golf Club",
                            "phoneNumber": "028 9080 5030"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.906807, 54.465682 ]
                        },
                        "properties": {
                            "name": "Temple Golf & Country Club",
                            "phoneNumber": "028 9263 9213"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.783817, 54.661631 ]
                        },
                        "properties": {
                            "name": "The Royal Belfast Golf Club",
                            "phoneNumber": "028 9042 8165"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.883267, 54.21792 ]
                        },
                        "properties": {
                            "name": "The Royal County Down Golf Club",
                            "phoneNumber": "028 4372 3314"
                        }
                    }
                ]
            };

            io.emit('nearbyGolfCoursesCoordinates', nearbyGolfCoursesGeoJsonData);
        });
    });

    /*
     * Round of golf with OpenLayers using Bing Maps
     */
    router.get(config.routes.roundOfGolf, [util.requireAuthentication], function(req, res) {
        res.render('roundOfGolf.jade', {title: 'Round of Golf'});
    });

    /*
     * Round of golf with Google Maps
     */
    router.get(config.routes.roundOfGolfGoogle, [util.requireAuthentication], function(req, res) {
        res.render('roundOfGolfGoogle.jade', {title: 'Round of Golf'});

        io.on('connection', function() {
            /**
             * Round Of Golf contained in a GeoJSON variable
             */
            var roundOfGolfGeoJsonData = {
                "type": "FeatureCollection",
                "crs": {
                    "type": "name",
                    "properties": {
                        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                },
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.683992, 54.625605 ]
                        },
                        "properties": {
                            "id": 1,
                            "name": "Shot 1"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.683818, 54.623937 ]
                        },
                        "properties": {
                            "id": 2,
                            "name": "Shot 2"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [ -5.682997, 54.622981 ]
                        },
                        "properties": {
                            "id": 3,
                            "name": "Shot 3"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": [[ -5.683992, 54.625605 ],[ -5.683818, 54.623937 ]]
                        },
                        "properties": {
                            "name": "Driver",
                            "distance": 207
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": [[ -5.683818, 54.623937 ],[ -5.682997, 54.622981 ]]
                        },
                        "properties": {
                            "name": "8 Iron",
                            "distance": 135
                        }
                    }
                ]
            };

            io.emit('roundOfGolfCoordinates', roundOfGolfGeoJsonData);
        });
    });

    return router;
};
//module.exports = router;
