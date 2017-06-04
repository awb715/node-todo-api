var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    text:{
      type:String,
      required:true,
      minlength:1,
      trim:true //removes whitespace beginning or end
    },
    completed:{
      type:Boolean,
        default:false
    },
    completedAt:{
      type: Number ,
        default:null
    }
});

//var newTodo = new Todo({
// text: 'Cook Dinner'   
//});

//var moreTodo = new Todo({
// text:`edit`
//});
//
////moreTodo.save().then((doc)=>{
////    console.log('Saved todo', doc);
////},(e)=>{ 
////    console.log(e);
////});
//
////new user model
////email - require it - trim - type is a string - min length of 1

module.exports = {Todo};