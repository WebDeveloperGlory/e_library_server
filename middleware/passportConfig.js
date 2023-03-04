var db              = require('../models'),
    localStrategy   = require('passport-local').Strategy,
    bcrypt          = require('bcryptjs');

module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            db.User.findOne({username: username}, (err, user) => {
                if(err) throw err;
                if(!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) throw err;
                    if(result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    };
                });
            });
        })
    );
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        db.User.findOne({_id: id}, (err, foundUser) => {
            done(err, foundUser);
        })
    })
};