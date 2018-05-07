var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('calculation', { title: 'calculation!' });
});

router.post('/', function(req, res, next) {
    var formula = req.body.formula;
    console.log(formula);
    res.send('POST request to the homepage');
});

module.exports = router;
