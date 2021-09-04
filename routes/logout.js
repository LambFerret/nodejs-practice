const router = require('express').Router();

router.get('/', function(req, res) {
    req.logout();
});

module.exports = router;
