var db          = require('../models');

exports.allBooks = function(req, res) {
    db.Book.find({})
    .populate("currentlyReading", { username: true, points: true })
    .populate("comments", { text: true, authur: true })
        .then(function(allBooks) {
            res.status(200).json({books: allBooks});
        }).catch(function(err) {
            res.status(401).json({message: err})
        });
};
exports.createBook = function(req, res) {
    db.Book.create(req.body)
        .then(function(createdBook) {
            res.status(200).json(createdBook);
        }).catch(function(err) {
            res.status(401).json(err);
        });
};

exports.getBook = function(req, res) {
    db.Book.findById(req.params.bookId)
    .populate("currentlyReading", { username: true, points: true })
    .populate("comments")
        .then(function(foundBook) {
            res.json(foundBook);
        }).catch(function(err) {
            res.status(401).json(err);
        });
}
exports.updateBook = function(req, res) {
    db.Book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true})
        .then(function(newlyUpdated) {
            res.status(201).json(newlyUpdated);
        }).catch(function(err) {
            res.status(401).json(err);
        });
};
exports.borrowBook = function(req, res, next) {
    const borrower = req.params.id || req.body.id;
    const bookId = req.params.bookId;

    db.Book.findById(bookId)
        .then(function(book) {
            if(book.currentlyReading.length === book.bookSize) {
                return res.status(401).json({message: 'Book Unavailable'})
            }
            if(book.currentlyReading.includes(borrower)) {
                return res.status(401).json({message: 'Already Borrowed Please Return It To Borrow Again'});
            }
            book.currentlyReading.push(borrower);
            book.save()
                .then(function(book) {
                    db.User.findById(borrower)
                        .then(function(user) {
                            user.currentlyBorrowed.push(bookId);
                            user.save()
                                .then(function(user) {
                                    return db.Book.findById(bookId)
                                });
                        })
                        .then(function(b) {
                            res.status(200).json({message: `successfully borrowed ${b.name}`});
                        }).catch(next);
                }).catch(next);
        }).catch(function(err) {
            res.status(401).json(err);
        });
}
exports.returnBook = function(req, res, next) {
    const returnee = req.params.id || req.body.id;
    const bookId = req.params.bookId;

    db.Book.findById(bookId)
        .then(function(book) {
            book.currentlyReading.pull(returnee);
            book.save()
                .then(function(book) {
                    db.User.findById(returnee)
                        .then(function(user) {
                            user.currentlyBorrowed.pull(bookId);
                            user.save()
                                .then(function(user) {
                                    return db.Book.findById(bookId)
                                });
                        })
                        .then(function(b) {
                            res.status(200).json({message: `successfully borrowed ${b.name}`});
                        }).catch(next);
                }).catch(next);
        }).catch(function(err) {
            res.status(401).json(err);
        });
}
exports.deleteBook = function(req, res) {
    db.Book.findOneAndDelete({_id: req.params.bookId})
        .then(function(deleted) {
            res.status(200).json({message: `successfully deleted ${deleted.name}`})
        }).catch(function(err) {
            res.status(401).json(err);
        });
}

exports.readBook = function(req, res, next) {
    const reader = req.params.id || req.body.id;
    const bookId = req.params.bookId ;

    db.User.findById(reader)
        .then(function(user) {
            if(user.read.includes(bookId)) {
                return res.status(401).json({message: 'Already Read'});
            }
            user.read.push(bookId)
            user.save()
        })
            .then(function(user) {
                if(user.read.includes(bookId)) {
                    return res.status(401).json({message: 'Already Read'});
                }
                return db.User.findOneAndUpdate({_id: reader}, {$inc: {'points': 5}}, {new: true})
            })
        .then(function(u) {
            res.status(200).json(u);
        })
        .catch(function(err) {
            res.status(401).json(err);
        })
}

module.exports = exports;