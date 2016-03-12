/**
 * Created by briansmith on 25/01/16
 */
var config = {
    port: 3000,
    secret: 'secret',
    redisUrl: 'redis://localhost',
    favicon: 'Golf_Pin.ico',
    routes: {
        login: '/login',
        logout: '/logout',
        loginProcess: '/loginProcess',
        home: '/',
        mainPage: '/mainPage',
        nearbyGolfCourses: '/nearbyGolfCourses',
        roundOfGolf: '/roundOfGolf',
        roundOfGolfGoogle: '/roundOfGolfGoogle',
        about: '/about',
        contact: '/contact'
    }
    
    // STORMPATH variables
    //STORMPATH_API_KEY_ID: getEnv('STORMPATH_API_KEY_ID'),
    //STORMPATH_API_KEY_SECRET: getEnv('STORMPATH_API_KEY_SECRET'),
    //STORMPATH_SECRET_KEY: getEnv('STORMPATH_SECRET_KEY'),
    //STORMPATH_URL: getEnv('STORMPATH_URL'),

    // This url is for the sample wines database hosted on mongolab
    // url : 'mongodb://mytest1:mytest2@ds063168.mongolab.com:63168/winedb'
    //winedBUrl: getEnv('WINEDBURL'),

    // callbackURL : 'http://cryptic-harbor-2948.herokuapp.com/google/callback'
    // use with heroku & remember to modify the callbackUrl on the google developers site to use this too

    // callbackURL : 'http://127.0.0.1:3000/google/callback'
    // use for local development
    //callbackURL: getEnv('callbackURL'),

    //clientID: getEnv('clientID'),
    //clientSecret: getEnv('clientSecret')
};

//function getEnv(variable){
//    if (process.env[variable] === undefined) {
//        throw new Error('You must create an environment variable for ' + variable);
//    }

//    return process.env[variable];
//}

module.exports = config;