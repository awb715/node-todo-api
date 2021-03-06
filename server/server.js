require('./config/config')



const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo'); //set standards for inputting info
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var app = express();

const port = process.env.PORT  //heroku uses this for app.list

app.use(bodyParser.json());

app.post('/todos',(req, res)=>{
   console.log(req.body);
    var todo = new Todo({   //req object caries modifications, create new instance
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);  //sends to server
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos}); //
    },(e)=>{
       res.status(400).send(e); 
    });
});

//GET Todos/id

app.get('/todos/:id', (req, res)=>{
  var id = req.params.id; //:id is the parameter on the get req object
    
    if(!ObjectID.isValid(id)){ //is the ID proper format?
      return res.status(404).send();
    }
    
     Todo.findById(id).then((todos)=>{
       if(!todos){//the ID may be validated but might not exist
           return res.status(404).send();
       }
         return   res.send({todos});
       }).catch((e)=>{
           res.status(400).send();
       });
  
});

app.delete('/todos/:id',(req,res)=>{
    
   var id = req.params.id;
    
    if(!ObjectID.isValid(id)){ //is the ID proper format?
      return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then((todo)=>{
        
     if(!todo){ //if idmight be right format but did the ID exist?
       return res.status(404).send();
   }
        res.send({todo});
}).catch((e)=>{
       res.status(400).send(); 
    });
    
});

app.patch('/todos/:id', (req,res)=>{
   var id = req.params.id;
   var body = _.pick(req.body,['text','completed']); //sets so only text and cpmplted can be updated, normally request body is really big, this makes it so text, completed are the only keys on the object,  see docs.
    
    
      if(!ObjectID.isValid(id)){ //is the ID proper format?
      return res.status(404).send();
    }
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime(); //sets time todo was done
    }else{
        body.completed = false  //if todo wasnt completed, we clear complete values
        body.completedAt = null;
        
    }
    
    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
      
        if(!todo){
            res.status(404).send();
        }
        res.send({todo});
        
    }).catch((e)=>{
        res.status(400).send();
    });
});



//post /users

app.post('/users', (req, res)=>{

    var body = _.pick(req.body,['email','password']);

    var user = new User(body);
    
   
//    user.generateAuthToken
    
    user.save().then(()=>{
        return user.generateAuthToken();  //sends to server
    }).then((token)=>{
        res.header('x-auth',token).send(user);
        
        
    }).catch((e)=>{
        res.status(400).send(e);
    })
    

    
    
});



//private route
app.get('/users/me' , authenticate,(req , res)=>{
  res.send(req.user);
   
});


//POST /users/login {email, password}
app.post('/users/login' , (req , res)=>{
    
 var body = _.pick(req.body,['email','password']);
  
    
    User.findByCredentials(body.email, body.password).then((user) => {
        
      return  user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        }) // here is were resolve gets sent 
     }).catch((e) => { //reject causes a catch
  res.status(400).send();
   });
});

app.listen(port, ()=>{
    console.log(`Started up at port ${port}`);
});

module.exports = {app}
