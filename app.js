/**
 * Created by briansmith on 23/04/2014.
 */

// modules ===================================================================
var app = require("express")();
var express = require("express");
var exphbs = require("express-handlebars");
var config = require("./config");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var csrf = require("csurf");
var logger = require("morgan");
var compression = require("compression");
var path = require("path");
var favicon = require("serve-favicon");
var helmet = require("helmet");
var session = require("express-session");
var flash = require("connect-flash");
var RedisStore = require("connect-redis")(session);
var util = require("./middleware/utilities");
var passport = require("./passport");

// call socket.io to the app
app.io = require("socket.io")();

// store static values in environment variables
require("dotenv").config();

// view engine setup
app.set("views", path.join(__dirname, "static/views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "single",
    extname: ".hbs",
    layoutsDir: "static/views/layouts/",
    partialsDir: "static/views/partials"
  })
);
app.set("view engine", ".hbs");

app.use(express.static(path.join(__dirname, "static")));
app.use(favicon(path.join(__dirname, "static/images", config.favicon)));

app.use(cookieParser(config.secret));

app.use(
  session({
    secret: config.secret,
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({
      url: config.redisUrl
    })
  })
);

app.use(passport.passport.initialize());
app.use(passport.passport.session());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(csrf({ cookie: true }));
app.use(util.csrf);

app.use(util.authenticated);

app.use(flash());
app.use(util.templateRoutes);

// helmet settings from https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/
app.use(helmet());

// morgan log settings from https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/
app.use(logger("common"));
/* 'default', 'short', 'tiny', 'dev' */

// CORS settings from https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// GZIP compression settings from https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/
app.use(compression());

// routes ====================================================================
/**
 * This is the api for general functions
 */
app.use("/", require("./routes/index")(app.io));

// app.use('/users', require('./routes/users'));

/**
 * This is the api is for golf functions
 */
app.use("/golf", require("./routes/golfApi"));

passport.routes(app);

// error handlers ============================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;
