/**
 * Created by briansmith on 01/10/15
 */
module.exports = function (io) {
  var r = require('rethinkdb')
  var express = require('express')
  var util = require('../middleware/utilities')
  var config = require('../config')
  var request = require('request')
  var user = require('../passport/user')
  var gcal = require('google-calendar')

  var connection

  var router = express.Router()

  /*
   * Home Page
   */
  router.get(config.routes.home, function (req, res) {
    res.render('home', { title: 'Golf Test Routines' })
  })

  /**
   * Register
   */
  router.get(config.routes.register, function (req, res) {
    // Missing message error
    res.render('register', { title: 'Golf Test Routines' })
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
   * Login Page
   */
  router.get(config.routes.login, function (req, res) {
    // Missing message error
    res.render('login', { title: 'Golf Test Routines' })
  })

  /**
   * Logout
   */
  router.get(config.routes.logout, function (req, res) {
    util.logOut(req)
    res.redirect(config.routes.home)
  })

  /**
   * About
   */
  router.get(config.routes.about, [util.requireAuthentication], function (req, res) {
    res.render('about', { title: 'Golf Test Routines', pageName: 'About Page' })
  })

  /**
   * Contact Page
   */
  router.get(config.routes.contact, [util.requireAuthentication], function (req, res) {
    res.render('contact', { title: 'Golf Test Routines', pageName: 'Contact Page' })
  })

  /**
   * Main Page
   */
  router.get(config.routes.mainPage, [util.requireAuthentication], function (req, res) {
    res.render('main', { title: 'Golf Test Routines' })
  })

  /*
   * Get Nearby Golf Courses
   */
  router.get(config.routes.nearbyGolfCourses, [util.requireAuthentication], function (req, res) {
    res.render('nearbyGolfCourses', { title: 'Golf Test Routines', pageName: 'Nearby Golf Courses Page' })

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

  /*
   * Get Rounds Of Golf
   */
  router.get(config.routes.roundsOfGolf, [util.requireAuthentication], function (req, res) {
    res.render('roundsOfGolf', { title: 'Golf Test Routines', pageName: 'Get Rounds of Golf Page' })

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
   * Find All My Rounds Of Golf
   */
  router.get(config.routes.findAllMyRounds, [util.requireAuthentication], function (req, res) {
    res.render('findAllMyRounds', { title: 'Golf Test Routines', pageName: 'Find All My Rounds Page' })
  })

  /**
   * Add My Round Of Golf
   */
  router.get(config.routes.addMyRound, [util.requireAuthentication], function (req, res) {
    res.render('addMyRound', { title: 'Golf Test Routines', pageName: 'Add My Round Page' })
  })

  /**
   * Find My Round Of Golf By Id
   */
  router.get(config.routes.findMyRoundById, [util.requireAuthentication], function (req, res) {
    res.render('findMyRoundById', { title: 'Golf Test Routines', pageName: 'Find My Round By Id Page' })
  })

  /**
   * Delete My Round Of Golf
   */
  router.get(config.routes.deleteMyRound, [util.requireAuthentication], function (req, res) {
    res.render('deleteMyRound', { title: 'Golf Test Routines', pageName: 'Delete My Round Page' })
  })

  /**
   * Course Scorecards
   */
  router.get(config.routes.courseScorecards, [util.requireAuthentication], function (req, res) {
    res.render('courseScorecards', { title: 'Golf Test Routines', pageName: 'Course Scorecards Page' })
  })

  /**
   * Membership Relationship Manager
   */
  router.get(config.routes.membershipRelationshipManager, [util.requireAuthentication], function (req, res) {
    res.render('membershipRelationshipManager', { title: 'Golf Test Routines', pageName: 'Membership Relationship Manager Page' })
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

        console.log('In the Read Competitions route')

        var data = { title: 'Golf Test Routines', pageName: 'Read Competitions Page', events: events }
        res.render('readCompetitions', data)
      }
    })
  })

  /**
   * Read Competitions with google-calendar npm module
   */
  router.get(config.routes.readGCCompetitions, [util.requireAuthentication], function (req, res) {

    var googleCalendar = new gcal.GoogleCalendar(config.google.googleOAuth2AccessToken)
    googleCalendar.events.list(config.calendarId, {'timeMin': new Date().toISOString()}, function (err, eventList) {

      if (err) {
        console.log('[ERROR] %s:%s \n%s', err.name, err.msg, err.message)
        res.send(500, err)
      } else {

        // Because googleCalendar returns a JSON file no need to parse eventList

        console.log(eventList)

        var events = []
        for (var i = 0; i < eventList.items.length; i++) {
          events.push(eventList.items[i])
        }

        console.log('In the Read google-calendar Competitions route')

        var data = { title: 'Golf Test Routines', pageName: 'Read google-calendar Competitions Page', events: events }
        res.render('readGCCompetitions', data)
      }
    })
  })

  /**
   * Add Competitions with google-calendar npm module
   */
  router.get(config.routes.addGCCompetitions, [util.requireAuthentication], function (req, res) {

/*
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

    /!*  Sample event created in Google Calendar
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
     *!/

    googleCalendar.events.insert(config.calendarId, addEventBody, function (addEventError, addEventResponse) {
      console.log('GOOGLE RESPONSE:', addEventError, addEventResponse)

      if (addEventError) {
        res.send(400, addEventError)
      } else {
        console.log(addEventResponse)

//                res.send(200, addEventResponse); // Google is throwing an error here
      }
    })
*/

    res.render('about', { title: 'Golf Test Routines', pageName: 'Add google-calendar Competition Page' })
  })

  return router
}
