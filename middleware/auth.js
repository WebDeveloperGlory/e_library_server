var db          = require('../models'),
    passport    = require('passport');

exports.authenticate = passport.authenticate("local");
exports.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated) {
        return next();
    }
    res.status(401).json({message: 'not logged in'})
}
module.exports = exports;