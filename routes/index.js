var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


let lastVisitTimestamp = null;



router.get('/last.txt', function(req, res) {
  if (lastVisitTimestamp) {
    
    res.send(`Last visited on: ${lastVisitTimestamp}`);
  } else {
    
    res.send('');
  }

  
  lastVisitTimestamp = new Date().toISOString();
});


module.exports = router;
