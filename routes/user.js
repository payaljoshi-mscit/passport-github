var router=require("express").Router();
let passport=require('../config/passport'); 
const User = require("../models/user");


// show home page
	router.get('/', function(req, res) {
		res.render('index.ejs')
	})
	// show profile page
	router.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		})
	})
	// logout page
	router.get('/logout', function(req, res) {
		req.logout(); //passport function for logout
		res.redirect('/')
	})

	/******************************github authentication*************************/
	router.get('/auth/github', passport.authenticate('github', { scope : 'email' }))
	router.get('/auth/github/callback', passport.authenticate('github', {
		successRedirect : '/profile',
		failureRedirect : '/'
	}))

module.exports =router

/********** check to see if user is authenticated for profile access***********/
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) 
		return next() // if authenticated then go to next middleware
	res.redirect('/') // if not authenticated then redirect to home page
}