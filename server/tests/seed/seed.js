const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const useroneId =new ObjectID();
const usertwoId = new ObjectID();
const users = [{
    
  _id:useroneId,
 email:'Aaron@gmail.com',
 password:'onepassword',
    tokens:[{
    access:'auth',
    token:jwt.sign({_id:useroneId,access:'auth'},'abc123').toString()
    
}]
    
},{
    
    _id: usertwoId,
        email:'chels@gmail.com',
        password:'twopassword'
    
    
    
    
}];



const todos = [{
    _id: new ObjectID(),
    text:'First test todo'
},
 {     _id: new ObjectID(),
     text:'Second test todo',
  completed:true,
  completedAt:333
 }             ];



const populateTodos = (done) => {
  Todo.remove({}).then(() => {
   return   Todo.insertMany(todos);
      
  }).then(()=>done());
};

const populateUsers = (done) =>{
  User.remove({}).then(()=>{
    var user1 = new User(users[0]).save();
    var user2 = new User(users[1]).save();
      
    return Promise.all([user1,user2]);
  }).then(()=>done());  
};

module.exports= {todos,populateTodos,users,populateUsers};