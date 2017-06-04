var mongoose = require('mongoose');

var User =mongoose.model('Users',{
    
    name:{
       type:String,
      required:true,
      minlength:1,
      trim:true 
    },
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    }
    
});

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

module.exports = {User};