var db              = require('../models'),
    passport        = require('passport'),
    // localStrategy   = require('passport-local'),
    bcrypt          = require('bcryptjs');
  

exports.login = (req, res) => {
    res.status(200).json({
        message: `Welcome ${req.user.username}`,
        user: req.user
    });
};

exports.signup = function(req, res) {
    const username = req.body.username;

    db.User.findOne({username: username}, async (err, doc) => {
        if(err) throw err;
        if(doc) res.status(401).json({message: "User Already Exists"});
        if(!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new db.User({
                username: username,
                password: hashedPassword
            });
            await newUser.save();
            res.status(200).json({message: `Successfully created ${newUser.username}`});
        };
    });
};


exports.logout = (req, res) => {
    req.logout((err) => {
        if(err) { return next(err) }
        res.json({message: 'see you later'})
    });
}


module.exports = exports;