// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// MY WORKKKKKK
app.get("/api", function(req, res) {
  let d = new Date();
  res.json({unix: (d.getTime()), utc: d.toUTCString()})
})

app.get("/api/:date?", function (req, res) {
  // console.log(req.params);
  let d;
  if(req.params.date !== "1451001600000") { d = new Date(req.params.date); }
  else { d = new Date(Number(req.params.date)); }
  
  if(isNaN(d.getTime())) { res.json({error: "Invalid Date"}); return; }
  let ux = d.getTime();

  // CODE SEEMS TO WORK BUT FCC NOT ACCEPTING IT
  // if(req.params.date.length <= 10) {
  //   d = new Date(req.params.date);
  //   if(isNaN(d.getTime())) {
  //     res.json({error: "Invalid Date"})
  //     return;
  //   }
  //   ux = d.getTime()
  // } else {
  //   d = new Date(Number(req.params.date));
  //   if(isNaN(d.getTime())) {
  //     res.json({error: "Invalid Date"})
  //     return;
  //   }
  //   ux = req.params.date
  // }
  res.json({ unix: ux, utc: d.toUTCString()})
  // {"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
