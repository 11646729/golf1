var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var bodyParser = new require('body-parser');
var cors = require('cors');

var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'static/views'));

// comment out one of these lines to change view engine
app.set('view engine', 'jade');
//app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'static/images', config.favicon)));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('secret'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: new RedisStore(
        {url: 'redis://localhost'})
    })
);
app.use(express.static(path.join(__dirname, 'static')));

app.use(cors({
    credentials: true,
    origin: true
}));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
