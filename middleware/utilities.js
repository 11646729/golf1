/**
 * Created by briansmith on 22/02/2016.
 */

module.exports.csrf = function csrf(req, res, next) {
    res.locals.token = req.csrfToken();
    next();
};

module.exports.authenticated = function authenticated(req, res, next){
  res.locals.isAuthenticated = req.session.isAuthenticated;
    if (req.session.isAuthenticated){
        res.locals.user = req.session.user;
    }
    next();
};

module.exports.requireAuthentication = function requireAuthentication(req, res, next) {
    if (req.session.isAuthenticated){
        next();
    } else {
        res.redirect('/login');
    }
};
