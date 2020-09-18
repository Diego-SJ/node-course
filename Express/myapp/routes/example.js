const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('example');
});

router.get('/subexample', function(req, res, next) {
  res.send('Example / sub example');
});

module.exports = router;
