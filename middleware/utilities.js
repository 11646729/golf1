/**
 * Created by briansmith on 19/02/2016.
 */

module.exports.csrf = function(req, res, next){
    res.locals.token = req.csrfToken();
    next();
}
