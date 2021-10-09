const mongoose = require('../config/mongodb')


// define schema for user model
let userSchema = mongoose.Schema({
        gid: String,
        token: String,
        displayName: String,
        username: String
})

var User= mongoose.model('User', userSchema)
// create the model for users and expose it to app
module.exports = User;