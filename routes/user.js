var express     = require('express'),
    router      = express.Router(),    
    db          = require('../models'),
    helpers     = require('../helpers/user');


router.route('/:userId')
    .get(helpers.getUser)
    .delete(helpers.deleteUser);

router.get('/', helpers.topUsers)

router.put('/:userId/email', helpers.addEmail)

module.exports = router;