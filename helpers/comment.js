var db          = require('../models');

exports.createComments = function(req, res, next) {
    const newComment = {
        text: req.body.text,
        authur: req.body.authur,
        authurName: req.body.name
    }

    db.Comment.create(newComment)
        .then(function(created) {
            db.User.findById(req.body.authur)
                .then(function(user) {
                    user.comments.push(created.id)
                    user.save()
                }).catch(next)
            db.Book.findById(req.params.bookId)
                .then(function(book) {
                    book.comments.push(created.id)
                    book.save()
                        .then(function(book) {
                            return db.Book.findById(req.params.bookId).populate('comments', { username: true, points: true })
                        })
                        .then(function(b) {
                            return res.status(200).json(b);
                        }).catch(function(err) { res.status(401).json(err) })
                }).catch(next)
        }).catch(next)
}

module.exports = exports;