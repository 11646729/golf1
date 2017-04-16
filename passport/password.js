/**
 * Created by briansmith on 12/03/2016.
 */

var crypto = require('crypto')
var scmp = require('scmp')
var config = require('../config')

var passwordCreate = function passwordCreate (password, cb) {
  crypto.randomBytes(config.crypto.randomSize, function (err, salt) {
    if (err) {
      return cb(err, null)
    } else {
      crypto.pbkdf2(password, salt.toString('base64'), config.crypto.workFactor, config.crypto.keylen, function (err, key) {
        if (err) {
          return cb(err, null)
        } else {
          cb(null, salt.toString('base64'), key.toString('base64'))
        }
      })
    }
  })
}

var passwordCheck = function passwordCheck (password, derivedPassword, salt, work, cb) {
  crypto.pbkdf2(password, salt, work, config.crypto.keylen, function (err, key) {
    if (err) {
      return cb(err, null)
    } else {
      cb(null, scmp(key.toString('base64'), derivedPassword))
    }
  })
}

exports.passwordCreate = passwordCreate
exports.passwordCheck = passwordCheck
