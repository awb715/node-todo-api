//const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} = require('mongodb'); //sameas above



var user = {name:'Aaron',age:22};
var {name} = user; //destructuring objects
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    
    if(err){
       return console.log('Unable to connect to MongoDB server');
    }
    
    console.log('Connect to MongoDB Server');
    
//    db.collection('Todos').insertOne({
//        somethingtodo:"Read",
//        completed:false 
//        
//    }, (err, result)=>{
//        if(err){
//            return console.log('Unable to insert todo',err);
//               }
//        console.log(JSON.stringify(result.ops,undefined, 2));
//        console.log(JSON.stringify(result.ops,undefined, 2));
//        console.log(JSON.stringify(result.ops,undefined, 2));
//    });
    
    //Insert new doc into Users collection, name, age, location
//     db.collection('Users').insertOne({
//        Name:"Aaron",
//        Age:22,
//        location:'Seattle' 
//        
//    }, (err, result)=>{
//        if(err){
//            return console.log('Unable to insert todo',err);
//               }
//        console.log(result.ops[0]._id.getTimestamp());
//    });
//    
    
    
    db.close();
});