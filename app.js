/**
 * Created by briansmith on 23/04/2014.
 */

// modules ===================================================================
var app = require("express")();
import { static } from "express";
import exphbs from "express-handlebars";
import { favicon as _favicon, secret as _secret, redisUrl } from "./config";
import cookieParser from "cookie-parser";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import csrf from "csurf";
import logger from "morgan";
import compression from "compression";
import { join } from "path";
import favicon from "serve-favicon";
import helmet from "helmet";
import session from "express-session";
import flash from "connect-flash";
var RedisStore = require("connect-redis")(session);
import {
  csrf as _csrf,
  authenticated,
  templateRoutes
} from "./middleware/utilities";
import { passport as _passport, routes } from "./passport";

// call socket.io to the app
app.io = require("socket.io")();

// store static values in environment variables
require("dotenv").config();

// view engine setup
app.set("views", join(__dirname, "static/views"));
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

app.use(static(join(__dirname, "static")));
app.use(favicon(join(__dirname, "static/images", _favicon)));

app.use(cookieParser(_secret));

app.use(
  session({
    secret: _secret,
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({
      url: redisUrl
    })
  })
);

app.use(_passport.initialize());
app.use(_passport.session());

app.use(json());
app.use(
  urlencoded({
    extended: false
  })
);

app.use(csrf({ cookie: true }));
app.use(_csrf);

app.use(authenticated);

app.use(flash());
app.use(templateRoutes);

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

routes(app);

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

export default app;
