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
	req.session.userId = 1;
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
			db.Schedule.findOrCreate({ 
				where: {
					userId: res.locals.currentUser.id
				},
				defaults: {
					placeId: req.body.parkId,
					location: req.body.parkName,
					time: req.body.time
				}
			}).spread(function(schedule, created) {
				var userId = res.locals.currentUser.id
				db.Schedule.find({
					where: {
						userId: userId
					}
				})
				.then(function(user) {
					user.updateAttributes({
						placeId: req.body.parkId,
						location: req.body.parkName,
						time: req.body.time
					});
				});
				res.redirect("/schedule");
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
	db.User.findById(res.locals.currentUser.id)
	.then(function(user) {
		console.log(user);
		db.Schedule.findById(user.scheduleId)
		.then(function(schedule) {
			db.Schedule.findAll({
				where: {
					placeId: schedule.placeId
				}
			}).then(function(schedules) {
				console.log(schedules);
				res.render("schedule.ejs", {
					schedules: schedules	
				});
			});			
		});
	});
});

// Sends schedule info to frontend ajax request
app.get("/api/schedule", function(req, res) {
	db.User.findById(res.locals.currentUser.id)
	.then(function(user) {
		console.log(user);
		db.Schedule.findById(user.scheduleId)
		.then(function(schedule) {
			db.Schedule.findAll({
				where: {
					placeId: schedule.placeId
				}
			}).then(function(schedules) {
				console.log(schedules);
				res.send(schedules);

			});			
		});
	});
})

app.get("/settings", function(req, res) {
	if (res.locals.currentUser) {
		res.render("settings.ejs", { alerts: req.flash()});
	} else {
		req.flash("danger", "You must be logged in to access this page.");
		res.redirect("/");
	}
});

app.post("/settings", function(req, res) {
	var smallDogs = req.body.smallDogs;
	var mediumDogs = req.body.mediumDogs;
	var largeDogs = req.body.largeDogs;
	var userId = res.locals.currentUser.id;
	// Updates # of user dogs on Schedule table
	db.Schedule.find({
		where: {
			userId: userId
		}
	}).then(function(schedule){
		console.log(schedule);
		schedule.updateAttributes({
			smallDogs: smallDogs,
			mediumDogs: mediumDogs,
			largeDogs: largeDogs
		}).then(function() {
			req.flash("success", "Settings have been updated.");
			res.redirect("/");
		});
	});
});


// Changing Password code, finishing when I have more time..
// app.post("/settings/password", function(req, res) {
// 	var userId = res.locals.currentUser.id;

// 	db.User.find({
// 		where: {
// 			id: res.locals.currentUser.id
// 		}
// 	}).then(function(user) {
// 		if (user.password == req.body.currentPassword) {
// 			console.log(req.body.currentPassword);
// 			console.log(req.body.password);
// 			// user.updateAttributes({
// 			// 	password: req.body.password
// 			// });
// 		} else {
// 			req.flash("danger", "Something went wrong, try again.");
// 			res.redirect("/settings");
// 		}
		
// 	});
// })

app.use("/auth", require("./controllers/auth"));
app.listen(3000);


