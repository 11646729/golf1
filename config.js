/**
 * Created by briansmith on 25/01/16
 */
var config = {
  port: 3000,
  secret: 'secret',
  mongoUrl: 'mongodb://mytest1:mytest2@ds063168.mlab.com:63168/winedb',
  redisUrl: 'redis://localhost',
  favicon: 'Golf_Pin.ico',
  routes: {
    facebookAuth: '/auth/facebook',
    facebookAuthCallback: '/auth/facebook/callback',
    googleAuth: '/auth/google',
    googleAuthCallback: '/auth/google/callback',
    login: '/account/login',
    about: '/about',
    contact: '/contact',
    logout: '/account/logout',
    register: '/account/register',
    registerProcess: '/account/registerProcess',
    home: '/',
    mainPage: '/mainPage',
    nearbyGolfCourses: '/nearbyGolfCourses',
    roundsOfGolf: '/roundsOfGolf',
    courseScorecards: '/courseScorecards',
    findMyRounds: '/findMyRounds',
    findMyRoundById: '/findMyRoundById',
    addMyRound: '/addMyRound',
    deleteMyRound: '/deleteMyRound',
    readCompetitions: '/readCompetitions',
    readGCCompetitions: '/readGCCompetitions',
    addGCCompetitions: '/addGCCompetitions'
  },
  googleCalendarUrl: 'https://www.googleapis.com/calendar/v3/calendars/bds6052@gmail.com/events?key=AIzaSyDfr2f5dXtGCmG_H6f0czMbHvopjrlteP0',
  calendarId: 'bds6052@gmail.com',
  host: 'http://localhost:3000',
  rethinkdb: {
    host: 'localhost',
    port: 28015,
    db: 'golf_test',
    tables: {
      nearbyGolfCourses: 'nearbyGolfCourses',
      roundOfGolf: 'roundOfGolfData2'
    }
  },
  facebook: {
    appID: '202694753422163',
    appSecret: 'a3ba090eedf476165bce3989cd4d47e8'
  },
  google: {
    clientID: '824211476195-mast726v6dbnmtkjubfhgq8skefvf2pn.apps.googleusercontent.com',
    clientSecret: 'gpmeaG99KGFN-YMuVcV8933E',
    googleOAuth2AccessToken: ''
  },
  crypto: {
    workFactor: 5000,
    keylen: 32,
    randomSize: 256
  }
}

module.exports = config
