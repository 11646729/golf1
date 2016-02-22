/**
 * Created by briansmith on 22/02/2016.
 */

module.exports.csrf = function csrf(req, res, next) {
    res.locals.token = req.csrfToken();
    next();
};