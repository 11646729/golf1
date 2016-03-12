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

//app.use(cors({
//    credentials: true,
//    origin: true
//}));

// routes ====================================================================
var routes = require('./routes/index');
app.use('/', routes);

//var users = require('./routes/users');
//app.use('/users', users);

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
