let GitHubStrategy = require('passport-github2').Strategy;
    

// load the user model
let User = require('../models/user');

// load authorization keys
let configAuth = require('./auth')
var passport=require("passport")
/*
IMP:
The serialized user object is stored in req.user 
by PassportJS taken from req.session.passport.user 
(which is is populated by Express) with the help of 
Passport's deserializeUser method. 
*/
    // serialize user for the session
    passport.serializeUser(function(user, done) {
        done(null,   user.id)
    })
    // deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })

    //passport.use(new GitHubStrategy({},function(){}))
    passport.use(new GitHubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL,
        passReqToCallback : true
    },
    function(req, token, refreshtoken, profile, done) {
        console.log("Token "+token )
        //console.log(req.user)  
        console.log(profile)  
        
        User.findOne({ 'gid' : profile.id }, function(err, user_found) {
                if (err) { return done(err) }
                console.log("USER")
                //console.log(user_found)
                
                if (!user_found) 
                {
                    var newUser = new User()
                    newUser.gid = profile.id
                    newUser.token = token
                    newUser.displayName = profile.displayName
                    newUser.username = profile.username

                    newUser.save(function(err) {
                        if (err) { throw err }
                        console.log("NEW")
                        return done(null, newUser)
                    })

                }
                else
                {
                    console.log("USER EXISTS")
                    return done(null, user_found)
                }

            })
    }))
 // end of module.exports function
 module.exports = passport ;