const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//var id = '59348382a3e2b4367489c9201';
//
//if (!ObjectID.isValid(id)){
//    console.log('ID not valid');
//}

//Todo.find({
//  _id:id 
//}).then((todos)=>{
//   console.log('todos', todos); 
//});
//
//Todo.findOne({
//  _id:id 
//}).then((todo)=>{
//   console.log('todo', todo); 
//});
//
//Todo.findById(id).then((todo)=>{
//    if(!todo){
//        return console.log('ID not found');
//    }
//   console.log('todo by ID', todo); 
//}).catch((e)=> console.log(e));


//user not found, user is found, handle errors

User.findById('59345cef315eec3462799ff2').then((user)=>{
   if(!user){
       return console.log('User not found');
   }
    
    console.log('User', user);
},(e)=>{console.log(e)});
         
User.findById('59345cef315eec3462799ff1').then((user)=>{
   if(!user){
       return console.log('User not found');
   }
    
    console.log('User', user);
},(e)=>{console.log(e)});   

