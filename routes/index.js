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




let visitCount = 0;

// Array of colors
const colors = ['red', 'yellow', 'green', 'blue'];

/* GET /color.html */
router.get('/color.html', function(req, res) {
  
  const currentColor = colors[visitCount % colors.length];

  visitCount++;
  
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Color Page</title>
    </head>
    <body>
      <h1 style="color:${currentColor};">${currentColor}</h1>
    </body>
    </html>
  `);
});




let visitTimestamps = [];

/* GET /log.html */
router.get('/log.html', function(req, res) {
  
  const currentTimestamp = new Date().toString();

  
  visitTimestamps.push(currentTimestamp);

 
  let timestampList = visitTimestamps.map(timestamp => `<li>${timestamp}</li>`).join('');

  
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Visitor Log</title>
    </head>
    <body>
      <h1>Visitor Log</h1>
      <ul>
        ${timestampList}
      </ul>
    </body>
    </html>
  `);
});





module.exports = router;