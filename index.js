var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var db = require("./models");
// var maps = require("./static/script.js");
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
	db.Schedule.create({
		location: req.body.parkName,
		time: req.body.time
	}).then(function(data) {

	});
});

app.get("/schedule", function(req, res) {
	db.Schedule.findAll().then(function(schedules) {
		console.log(schedules);
	});
})

app.listen(3000);


