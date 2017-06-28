const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
    name: {
        type: String
        , minlength: 1
        , trim: true
    }
    , email: {
        type: String
        , required: true
        , minlength: 1
        , trim: true
        , unique: true
        , validate: {
            validator: validator.isEmail
            , message: '{VALUE} is not a valid email'
        }
    }
    , password: {
        type: String
        , required: true
        , minlength: 6
    }
    , tokens: [{
        access: {
            type: String
            , required: true
        }
        , token: {
            type: String
            , required: true
        }
    }]
});
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth'; //what is access
    var token = jwt.sign({
        _id: user._id.toHexString()
        , access
    }, 'abc123').toString();
    //confusing^^^
    user.tokens.push({
        access
        , token
    });
    return user.save().then(() => {
        return token;
    });
};
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    }
    catch (e) {
        return Promise.reject(); //prevents then from running in find byToken calls   
    }
    return User.findOne({
        '_id': decoded._id
        , 'tokens.token': token
        , 'tokens.access': 'auth'
    });
};
//hashing salting password
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        //user.password 
        bcrypt.genSalt(10, (err, salt) => { //generate a salt
            bcrypt.hash(user.password, salt, (err, hash) => { //salts and hashespw
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
//model methods called in server.js
UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({
        email
    }).then((user) => { //user object is the return from Findone
        if (!user) { //if user doesnt exist
            return Promise.reject(); //this calls catch in server.js
        }
        return new Promise((resolve, reject) => {
            //use bcrypt.compare, if true call resolve user
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    console.log('resolve');
                    resolve(user); //calls promise, allows server.js to have full user object
                }
                else {
                    console.log('reject');
                    reject();
                }; //sends 400 back
            });
        });
    });
};
var User = mongoose.model('Users', UserSchema);
//var newUser = new User({
//    name:'Aaron',
//    email:'awb715@gmail.com'
//});
//
//newUser.save().then((doc)=>{
//    console.log('Saved todo', doc);
//},(e)=>{ 
//    console.log(e);
//});
module.exports = {
    User
};