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
        roundOfGolf: '/roundOfGolf',
        roundOfGolfGoogle: '/roundOfGolfGoogle',
        findMyRounds: '/findMyRounds',
        addMyRound: '/addMyRound'
    },
    host: 'http://localhost:3000',
    facebook: {
        appID: '202694753422163',
        appSecret: 'a3ba090eedf476165bce3989cd4d47e8'
    },
    google: {
        clientID: '824211476195-mast726v6dbnmtkjubfhgq8skefvf2pn.apps.googleusercontent.com',
        clientSecret: 'gpmeaG99KGFN-YMuVcV8933E'
    },
    crypto: {
        workFactor: 5000,
        keylen: 32,
        randomSize: 256
    },
    myRound: {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.683992, 54.625605]
                },
                "properties": {
                    "shotNumber": "1"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.683818, 54.623937]
                },
                "properties": {
                    "shotNumber": "2"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.682997, 54.622981]
                },
                "properties": {
                    "shotNumber": "3"
                }
            }
        ]
    }
};


module.exports = config;