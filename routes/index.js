/**
 * Created by briansmith on 01/10/15
 */
module.exports = function (io) {
  var r = require('rethinkdb')
  // var assert = require('assert')
  var express = require('express')
  var router = express.Router()
  var util = require('../middleware/utilities')
  var config = require('../config')
  var request = require('request')
  var user = require('../passport/user')
  var gcal = require('google-calendar')
  var path = require('path')
  var fs = require('fs')

  var connection

  /*
   * Home page
   */
  router.get(config.routes.home, function (req, res) {
//    res.render('home.jade', {title: 'Home'})

    // If statement in jade file not yet working
    var file = '/Users/briansmith/Documents/GTD/golf-1/static/views/homeNew.html'
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream(file).pipe(res);
  })

  /**
   * Register
   */
  router.get(config.routes.register, function (req, res) {
    res.render('register.jade', {title: 'Register', message: req.flash('error')})
  })

  /**
   * Register posted values
   */
  router.post(config.routes.registerProcess, function (req, res) {
    if (req.body.username && req.body.password) {
      user.addUser(req.body.username, req.body.password, config.crypto.workFactor, function (err, profile) {
        if (err) {
          req.flash('error', err)
          res.redirect(config.routes.register)
        } else {
          req.login(profile, function () {
            res.redirect(config.routes.mainPage)
          })
        }
      })
    } else {
      req.flash('error', 'Please fill out all the fields')
      res.redirect(config.routes.register)
    }
  })

  /*
   * Login page
   */
  router.get(config.routes.login, function (req, res) {
//    res.render('login.jade', {title: 'Login', message: req.flash('error')})

    // Missing message error
    var file = '/Users/briansmith/Documents/GTD/golf-1/static/views/loginNew.html'
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream(file).pipe(res);
  })

  /**
   * Logout page
   */
  router.get(config.routes.logout, function (req, res) {
    util.logOut(req)
    res.redirect(config.routes.home)
  })

  /**
   * About
   */
  router.get(config.routes.about, [util.requireAuthentication], function (req, res) {
//    res.render('about.jade', {title: 'About Page'})

    var file = '/Users/briansmith/Documents/GTD/golf-1/static/views/aboutNew.html'
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream(file).pipe(res);
  })

  /**
   * Contact
   */
  router.get(config.routes.contact, [util.requireAuthentication], function (req, res) {
//    res.render('contact.jade', {title: 'Contact Page'})

    var file = '/Users/briansmith/Documents/GTD/golf-1/static/views/contactNew.html'
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream(file).pipe(res);
  })

  /**
   * Main page
   */
  router.get(config.routes.mainPage, [util.requireAuthentication], function (req, res) {
    res.render('mainPage.jade', {title: 'Index'})
  })

  /*
   * Get initial values of Nearby Golf Courses
   */
  router.get(config.routes.nearbyGolfCourses, [util.requireAuthentication], function (req, res) {
    res.render('nearbyGolfCourses.jade', {title: 'Nearby Golf Courses'})

    io.on('connection', function () {
      r.connect({host: config.rethinkdb.host, port: config.rethinkdb.port}, function (err, conn) {
        if (err) {
          console.log('[ERROR] %s:%s \n%s', err.name, err.msg, err.message)
          res.send([])
        }

        connection = conn

        r.db(config.rethinkdb.db).table(config.rethinkdb.tables.nearbyGolfCourses).run(connection, function (err, cursor) {
          if (err) {
            console.log('[ERROR] %s:%s \n%s', err.name, err.msg, err.message)
            res.send([])
          } else {
            cursor.toArray(function (err, nearbyGolfCoursesData) {
              if (err) {
                console.log('[ERROR] %s:%s \n%s', err.name, err.msg, err.message)
                res.send([])
              } else {
                io.emit('loadNearbyGolfCoursesData', nearbyGolfCoursesData)
              }
            })
          }
        })

        if (this.conn) {
          this.conn.close()
          console.log('Database connection closed')
        }
      })
    })
  })

  /**
   * TODO
   * Get update values of Nearby Golf Courses
   */

  /*
   * Get initial values of Round Of Golf
   */
  router.get(config.routes.roundsOfGolf, [util.requireAuthentication], function (req, res) {
    res.render('roundsOfGolf.jade', {title: 'Round of Golf'})

    io.on('connection', function () {
      r.connect({host: config.rethinkdb.host, port: config.rethinkdb.port}, function (err, conn) {
        if (err) {
          console.log('[ERROR] %s:%s \n%s', err.name, err.msg, err.message)
          res.send([])
        }

        connection = conn

        r.db(config.rethinkdb.db).table(config.rethinkdb.tables.roundOfGolf).run(connection, function (err, cursor) {
          if (err) {
            console.log('[ERROR] %s:%s \n%s', err.name, err.msg, err.message)
            res.send([])
          } else {
            cursor.toArray(function (err, roundOfGolfData) {
              if (err) {
                console.log('[ERROR] %s:%s \n%s', err.name, err.msg, err.message)
                res.send([])
              } else {
                io.emit('loadRoundOfGolfData', roundOfGolfData)
              }
            })
          }
        })

        if (this.conn) {
          this.conn.close()
          console.log('Database connection closed')
        }
      })
    })
  })

  /**
   * TODO
   * Get update values of Round Of Golf
   */

  /**
   * Course Scorecards
   */
  router.get(config.routes.courseScorecards, [util.requireAuthentication], function (req, res) {
    res.render('courseScorecards.jade', {title: 'Course Scorecards Page'})
  })

  /**
   * Read Competitions
   */
  router.get(config.routes.readCompetitions, [util.requireAuthentication], function (req, res) {
    request(config.googleCalendarUrl, function (err, resp, eventList) {
      if (err) {
        console.log('[ERROR] %s:%s \n%s', err.name, err.msg, err.message)
        res.send([])
      } else {
        eventList = JSON.parse(eventList)

        console.log(eventList) // Using this line shows that extendedProperties are not being returned

        var events = []

        for (var i = 0; i < eventList.items.length; i++) {
          events.push(eventList.items[i])
        }

        res.render('readCompetitions.jade', {title: 'Read Competitions Page', 'events': events})
      }
    })
  })

  /**
   * Read Competitions with google-calendar npm module
   */
  router.get(config.routes.readGCCompetitions, [util.requireAuthentication], function (req, res) {
    var googleCalendar = new gcal.GoogleCalendar(config.google.googleOAuth2AccessToken)

    // google-calendar returns a JSON file
    googleCalendar.events.list(config.calendarId, {'timeMin': new Date().toISOString()}, function (err, eventList) {
      var returnedEventList = JSON.parse(eventList)
//      console.log(returnedEventList);

      returnedEventList['items'].push({'testPush': 'testPushData'})
      eventList = JSON.stringify(returnedEventList)

      console.log(eventList)

      var jsonStr = '{"theTeam":[{"teamId":"1","status":"pending"},{"teamId":"2","status":"member"}]}'
      var obj = JSON.parse(jsonStr)
      obj['theTeam'].push({'teamId': '3', 'status': 'member'})
      jsonStr = JSON.stringify(obj)
      // "{"theTeam":[{"teamId":"1","status":"pending"},{"teamId":"2","status":"member"},{"teamId":"3","status":"member"}]}"
      console.log(jsonStr)

      if (err) {
        res.send(500, err)
      } else {
        var events = []

        for (var i = 0; i < eventList.items.length; i++) {
          events.push(eventList.items[i])
        }

        res.render('readGCCompetitions.jade', {title: 'Read Competitions google-calendar Page', 'events': events})
      }
    })
  })

  /**
   * Add Competitions with google-calendar npm module
   */
  router.get(config.routes.addGCCompetitions, [util.requireAuthentication], function (req, res) {
    var googleCalendar = new gcal.GoogleCalendar(config.google.googleOAuth2AccessToken)

    var addEventBody = {
      'status': 'confirmed',
      'summary': 'Constructed calendar test - summary',
      'description': 'Constructed calendar test - description',
      'location': 'Clandeboye Golf Club, 51 Tower Rd, Bangor, Newtownards BT23, UK',
      'creator': {
        'email': 'bds6052@gmail.com',
        'displayName': 'Brian Smith',
        'self': true
      },
      'organizer': {
        'email': 'bds6052@gmail.com',
        'displayName': 'Brian Smith',
        'self': true
      },
      'start': {
        'dateTime': '2017-03-31T20:00:00+01:00',
        'timeZone': 'Europe/London'
      },
      'end': {
        'dateTime': '2017-03-31T21:00:00+01:00',
        'timeZone': 'Europe/London'
      },
      'extendedProperties': {
        'shared': {
          'competitionName': 'The Maritime Cup',
          'playedOnCourse': 'Dufferin'
        }
      }
    }

    /*  Sample event created in Google Calendar
     {
     "kind":"calendar#event",
     "etag":"\"2981454882834000\"",
     "id":"oo3ucrbj28ipi9nbiob2cc89t4",
     "status":"confirmed",
     "htmlLink":"https://www.google.com/calendar/event?eid=b28zdWNyYmoyOGlwaTluYmlvYjJjYzg5dDQgYmRzNjA1MkBt",
     "created":"2017-03-28T18:57:21.000Z",
     "updated":"2017-03-28T18:57:21.417Z",
     "location":"Clandeboye Golf Club, 51 Tower Rd, Bangor, Newtownards BT23, UK",
     "creator": {
     "email":"bds6052@gmail.com",
     "displayName":"Brian Smith",
     "self":true
     },
     "organizer": {
     "email":"bds6052@gmail.com",
     "displayName":"Brian Smith",
     "self":true
     },
     "start": {
     "dateTime":"2017-03-28T20:00:00+01:00",
     "timeZone":"Europe/London"
     },
     "end": {
     "dateTime":"2017-03-28T21:00:00+01:00",
     "timeZone":"Europe/London"
     },
     "iCalUID":"oo3ucrbj28ipi9nbiob2cc89t4@google.com",
     "sequence":0,
     "reminders": {
     "useDefault":true
     }
     }
     */

    googleCalendar.events.insert(config.calendarId, addEventBody, function (addEventError, addEventResponse) {
      console.log('GOOGLE RESPONSE:', addEventError, addEventResponse)

      if (addEventError) {
        res.send(400, addEventError)
      } else {
        console.log(addEventResponse)

//                res.send(200, addEventResponse); // Google is throwing an error here
      }
    })

    res.render('addGCCompetitions.jade', {title: 'Add Competitions google-calendar Page'})
  })

  return router
}
