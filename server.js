// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ytsr = require("ytsr");

var links = new Array();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/", function(request, response) {
  response.setHeader("Content-Type", "application/json");

  var tmp = 0;
  links = [];
  request.body.forEach(element => {
    ytsr(element.name, { limit: 1 }, (err, result) => {
      links.push(result);
      tmp++;
      if (tmp == request.body.length) {
        response.send(links);
      }
    });
  });
  //  response.send(JSON.stringify(links));
  //  response.send(JSON.stringify(result));
  // app.response.send(request.body); // echo the result back
});

// listen for requests :)
const listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
