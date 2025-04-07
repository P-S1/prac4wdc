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


let colorCycleIndex = 0;
const colors = ['red', 'yellow', 'green', 'blue'];


router.get('/color.txt', function(req, res) {
  const currentColor = colors[colorCycleIndex];
  
  
  colorCycleIndex = (colorCycleIndex + 1) % colors.length;

  res.send(currentColor);  
});


router.get('/color.html', function(req, res) {
  const currentColor = colors[colorCycleIndex];
  
  colorCycleIndex = (colorCycleIndex + 1) % colors.length;
  
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




const newcolorarray = ['red', 'yellow', 'green', 'blue'];


let newcolorcounter = 0;  

router.get('/color.txt', function(req, res, next) {
  
  res.send(newcolorarray[newcolorcounter]);

  
  newcolorcounter++;
  if (newcolorcounter === newcolorarray.length) {
    newcolorcounter = 0;  
  }
});



// Visitor Log - Tracks timestamps
let visitTimestamps = [];

router.get('/log.json', function(req, res) {
  const currentTimestamp = new Date().toISOString();
  
  // Add new timestamp for the visit
  visitTimestamps.push(currentTimestamp);

  // Send the JSON array of timestamps
  res.json(visitTimestamps);  // JSON response with all timestamps
});

// Visitor Log Read-Only - Does not add timestamps
router.get('/log-ro.json', function(req, res) {
  res.json(visitTimestamps);  // JSON response with existing timestamps, no new entries
});


module.exports = router;