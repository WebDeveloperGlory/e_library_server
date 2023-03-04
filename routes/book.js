var express     = require('express'),
    router      = express.Router(),    
    db          = require('../models'),
    helpers     = require('../helpers/book');
    middleware  = require('../middleware/auth');

router.route('/')
    .get(middleware.isLoggedIn, helpers.allBooks)
    .post(helpers.createBook);

router.route('/:bookId')
    .get(helpers.getBook)
    .put(helpers.updateBook)
    .delete(helpers.deleteBook);

router.put('/:bookId/borrow', helpers.borrowBook);
router.put('/:bookId/return', helpers.returnBook);
router.put('/:bookId/read', helpers.readBook);

module.exports = router;
    