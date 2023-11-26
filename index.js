// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;

  // If the date parameter is not provided, use the current date
  let timestamp;

  if (dateParam) {
    // Parsing the date parameter in the format "DD-MM-YYYY"
    let parts = dateParam.split("-");
    timestamp = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
  } else {
    // If the date parameter is not provided, use the current date
   
    timestamp = new Date().getTime();
  }

  // Checking if the parsed value is a valid number
  if (isNaN(timestamp)) {
    return res.json({ error: "Invalid Date" });
  }
  console.log(timestamp)
  // Creating a Date object using the provided Unix timestamp
  let dateObj = new Date(timestamp);

  // Sending the response with Unix timestamp and UTC string
  res.json({ unix: timestamp, utc: dateObj.toUTCString() });
});

// app.get("/api/:unix?",function(req,res){
//   let unix = req.params.unix;
//   let dateObj = new Date(unix);
//   res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
//   console.log(dateObj);
// })

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
