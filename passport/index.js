/**
 * Created by briansmith on 11/03/2016.
 */

var passport = require('passport')
var facebook = require('passport-facebook').Strategy
var google = require('passport-google-oauth').OAuth2Strategy
var local = require('passport-local').Strategy
var passwordUtils = require('./password')
var user = require('./user')
var config = require('../config')

passport.use(new facebook({
  clientID: config.facebook.appID,
  clientSecret: config.facebook.appSecret,
  callbackURL: config.host + config.routes.facebookAuthCallback
},
  function (accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
))

passport.use(new google({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.host + config.routes.googleAuthCallback
},
function (accessToken, refreshToken, profile, done) {
  config.google.googleOAuth2AccessToken = accessToken
  done(null, profile)
}))

passport.use(new local(function (username, password, done) {
  user.findByUsername(username, function (err, profile) {
    if (err) {
      console.log(err)
    } else {
      if (profile) {
        passwordUtils.passwordCheck(password, profile.password, profile.salt, profile.work, function (err, isAuth) {
          if (err) {
            console.log(err)
          } else {
            if (isAuth) {
              if (profile.work < config.crypto.workFactor) {
                user.updatePassword(username, password, config.crypto.workFactor)
              }
              done(null, profile)
            } else {
              done(null, false, {message: 'Wrong Username or Password'})
            }
          }
        })
      } else {
        done(null, false, {message: 'Wrong Username or Password'})
      }
    }
  })
}))

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

var routes = function routes (app) {
  app.get(config.routes.facebookAuth, passport.authenticate('facebook'))
  app.get(config.routes.facebookAuthCallback, passport.authenticate('facebook',
    {successRedirect: config.routes.mainPage, failureRedirect: config.routes.login, failureFlash: true}))

  app.get(config.routes.googleAuth, passport.authenticate('google',
    {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/calendar']}))

  app.get(config.routes.googleAuthCallback, passport.authenticate('google',
    {successRedirect: config.routes.mainPage, failureRedirect: config.routes.login, failureFlash: true}))

  app.post(config.routes.login, passport.authenticate('local',
    {successRedirect: config.routes.mainPage, failureRedirect: config.routes.login, failureFlash: true}))
}

exports.passport = passport
exports.routes = routes
