var express = require("express");
var db = require("../models");
var router = express.Router();

// Login page
router.get("/login", function(req, res) {
	res.render("auth/login", {alerts: req.flash()});

});

// Checks if email/password is correct
// Redirects user as necessary
router.post("/login", function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	db.User.authenticate(email, password, function(err, user) {
		if (err) {
			req.flash("danger", "Email and/or password invalid.");
			res.redirect("/auth/login");
		} else if (user) {
			req.session.userId = user.id;
			req.flash("success", "You are logged in.");
			res.redirect("/");
		} else {
			req.flash("danger", "Email and/or password invalid.");
			res.redirect("/auth/login");
		}
	});
});

// Registration page
router.get("/register", function(req, res) {
	res.render("auth/register", {alerts: req.flash()});
});

// Checks if email is in use
// Creates a new user
router.post("/register", function(req, res) {
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;

	db.User.findOrCreate({
		where: {
			email: email
		},
		defaults: {
			username: username,
			password: password
		}
	}).spread(function(user, created) {
		if (created) {
			req.flash("success", "You created an account! Login to continue.")
			res.redirect("/");
		} else {
			req.flash("danger", "That email is already being used.. Push Register to try again with another email.");
			res.redirect("/");
		}
	}).catch(function(err) { // catches errors coming from sequelize
		req.flash("danger", "Something went wrong, try again.")
		res.redirect("/auth/register");
	});
});

router.get("/logout", function(req, res) {
	req.flash("info", "You are logged out.");
	req.session.userId = false;
	res.redirect("/");
});

module.exports = router;