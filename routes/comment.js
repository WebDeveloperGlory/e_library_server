var express     = require('express'),
    router      = express.Router({ mergeParams: true }),    
    db          = require('../models'),
    helpers     = require('../helpers/comment');

router.route('/')
    .post(helpers.createComments)



module.exports = router;