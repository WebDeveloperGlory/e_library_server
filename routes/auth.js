var express     = require('express'),
    router      = express.Router(),
    db          = require('../models'),
    helpers     = require('../helpers/auth'),
    middleware  = require('../middleware/auth');

router.post('/login', middleware.authenticate, helpers.login);
router.post('/signup', helpers.signup);
router.post('/logout', middleware.isLoggedIn, helpers.logout);

module.exports = router;