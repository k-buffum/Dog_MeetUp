var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var session= require("express-session");
var flash = require("connect-flash");
var db = require("./models");
var app = express();

app.set("view engine", "ejs");

app.use(ejsLayouts);
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: "b14hb14h5u99453cr3t",
	resave: false,
	saveUninitialized: true
}));
// session must be installed to use flash
// flash must be called after session
// ^^^^^^^^^^^^^
app.use(flash());
// Checks to see if user logged in
// if logged in, currentUser is set to user
// if user not logged in, currentUser is set to false
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
app.use(function(req, res, next) {
	if (req.session.userId) {
		db.User.findById(req.session.userId).then(function(user) {
			req.currentUser = user;
			res.locals.currentUser = user;
			next();
		});
	} else {
		req.currentUser = false;
		res.locals.currentUser = false;
		next();
	}
});

// Home page
app.get("/", function(req, res) {
	res.render("index", {alerts: req.flash()});
});

// Posts location and time to schedule table
app.post("/schedule", function(req, res) {
	if (res.locals.currentUser) {
		if (req.body.parkName) {
			db.Schedule.create({
				userId: res.locals.currentUser.id,
				placeId: req.body.parkId,
				location: req.body.parkName,
				time: req.body.time
			}).then(function(data) {
				res.redirect("/");
			});
		} else {
			req.flash("danger", "You must select a location to continue.");
			res.redirect("/");
		}
		
	} else {
		req.flash("danger", "You must login or register to continue.");
		res.redirect("/");
	}
});

// Schedule page
app.get("/schedule", function(req, res) {
	console.log(res.locals.currentUser);
	db.Schedule.findAll({
		where : {
			location: req.body.location
		}
	}).then(function(schedules) {
		// console.log(schedules);
		res.render("schedule.ejs", {
			schedules: schedules,
			alerts: req.flash()
		});
	});
});

app.get("/settings", function(req, res) {
	if (res.locals.currentUser) {
		res.render("settings.ejs", { alerts: req.flash()});
	} else {
		req.flash("danger", "You must be logged in to access this page.");
		res.redirect("/");
	}
});

app.use("/auth", require("./controllers/auth"));
app.listen(3000);


