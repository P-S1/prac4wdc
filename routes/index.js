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


let visitTimestampsHTML = [];  

/* GET /log.html */
router.get('/log.html', function(req, res) {
  const currentTimestamp = new Date().toISOString();  

  visitTimestampsHTML.push(currentTimestamp);  
  
  let timestampList = visitTimestampsHTML.map(timestamp => `<li>${timestamp}</li>`).join('');  

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


let visitTimestampsJSON = [];  


router.get('/log.json', function(req, res) {
  const currentTimestamp = new Date().toISOString();
  visitTimestampsJSON.push(currentTimestamp);  

  res.json(visitTimestampsJSON);  
});


router.get('/log-ro.json', function(req, res) {
  res.json(visitTimestampsJSON);  
});




router.get('/contact.ajax', function(req, res) {
  res.send('<a href="mailto:your.email@example.com">Email Me</a>');  
});


router.get('/search.ajax', function(req, res) {
  res.send(`
    <label for="search">Search:</label>
    <input type="text" id="search" name="search">
    <button>Search</button>
  `);  
});


router.get('/about.ajax', function(req, res) {
  res.send('<p>AJAX is awesome because it lets web pages update dynamically without reloading the entire page!</p>');
});



let termsAccepted = false;


router.get('/accept', function(req, res) {
  if (termsAccepted) {
    
    res.sendStatus(200);
  } else {
    
    res.sendStatus(403);
  }
});


router.get('/content.ajax', function(req, res) {
  if (termsAccepted) {
    
    res.send(`
      <p>This is the first paragraph of content.</p>
      <p>This is the second paragraph of content.</p>
    `);
  } else {
    
    res.sendStatus(403);
  }
});


module.exports = router;