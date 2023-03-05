var db          = require('../models');

exports.getUser = function(req, res) {
    db.User.findById(req.params.userId)
    .populate("comments", { text: true, book: true })
        .then(function(foundUser) {
            res.status(200).json(foundUser);
        }).catch(function(err) {
            res.status(401).json(err);
        });
}
exports.addEmail = function(req, res) {
    db.User.findOneAndUpdate({_id: req.params.userId}, { $set: {email: req.body.email, username: req.body.username}, $inc: { 'points' : 10 } }, {new: true})
        .then(function(user) {
            res.status(200).json({message: `successfully updated email to ${user.email}`, user: user});
        }).catch(function(err) {
            res.status(401).json(err);
        });
}
exports.deleteUser = function(req, res) {
    db.User.findOneAndDelete({_id: req.params.userId})
        .then(function(deleted) {
            res.status(200).json({message: `successfully deleted ${deleted.name}`})
        }).catch(function(err) {
            res.status(401).json(err);
        });
}
exports.topUsers = function(req, res) {
    db.User.find({}).sort({points: 'desc'})
        .then(function(users) {
            res.status(200).json(users);
        }).catch(function(err) {
            res.status(401).json(err);
        });
}

module.exports = exports;