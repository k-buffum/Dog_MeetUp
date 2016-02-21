var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var db = require("./models");
var app = express();

app.set("view engine", "ejs");

app.use(ejsLayouts);
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended: false}));



/*
* GET homepage
* Display map with of location
  and dog parks/ parks nearby
* Display Navbar with App name
  Login button & Register button
* Enable user to select time
  and location
*/
app.get("/", function(req, res) {
	res.render("index.ejs");
});





app.post("/schedule", function(req, res) {
	console.log(req.body.name);
	console.log(req.body.dogAmount);
	console.log(req.body.time);
	console.log(req.body.date);
	console.log(req.body.location);
});

app.listen(3000);


