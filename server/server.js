var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} =require('./db/mongoose.js');

var {Todo}=require('./models/todo');

var {User}= require('./models/user');
var queries = require('./../playground/mongoose-queries.js');
const {ObjectID} = require('mongodb');

var app = express();

const port = process.env.PORT || 3000//heroku uses this for app.list

app.use(bodyParser.json());

app.post('/todos',(req, res)=>{
   console.log(req.body);
    var todo = new Todo({
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
        
     if(!todo){
       return res.status(404).send();
   }
        res.send(todo);
}).catch((e)=>{
       res.status(400).send(); 
    });
    
});

app.listen(port, ()=>{
    console.log(`Started up at port ${port}`);
});

module.exports = {app}
