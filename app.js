/**
 * Created by briansmith on 23/04/2014.
 */

// modules ===================================================================
var express = require('express'),
    config = require('./config'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    csrf = require('csurf'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    helmet = require('helmet'),
    session = require('express-session'),
    flash = require('connect-flash'),
    RedisStore = require('connect-redis')(session),
    util = require('./middleware/utilities'),
    passport = require('./passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'static/views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static/images', config.favicon)));

app.use(logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(cookieParser(config.secret));

app.use(session({
    secret: config.secret,
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({
            url: config.redisUrl
    })
}));

app.use(passport.passport.initialize());
app.use(passport.passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(csrf({ cookie: true }));
app.use(util.csrf);

app.use(util.authenticated);

app.use(flash());
app.use(util.templateRoutes);

app.use(helmet());

// CORS settings from https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/
//app.use(cors({
//    origin: ["http://localhost:3000"],
//    methods: ["GET", "POST"],
//    allowedHeaders: ["Content-Type", "Authorization"]
//}));

// routes ====================================================================
/**
 * This is the api for general functions
 */
app.use('/', require('./routes/index'));

//app.use('/users', require('./routes/users'));

/**
 * This is the api is for golf functions
 */
app.use('/golf', require('./routes/golfApi'));

passport.routes(app);

// error handlers ============================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
