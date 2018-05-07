var express = require('express');
var router = express.Router();

router.get('/calculation', function(req, res, next) {
    res.render('calculation', { title: 'calculation!' });
});

module.exports = router;
