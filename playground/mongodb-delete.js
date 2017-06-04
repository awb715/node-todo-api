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
    
    //delete many
//    db.collection('Todos').deleteMany({text:'Call Mom'}).then((result)=>{
//        console.log(result);
//    })
    //delete one
    
//    db.collection('Todos').deleteOne({text:'walk dog'}).then((res)=>{
//        console.log(res);
//    });
    
    //find and delete

//db.collection('Users').deleteMany({Name:'Aaron'}).then((res)=>{
//        console.log(res);
//    });
    
    db.collection('Users').findOneAndDelete({_id:new ObjectID('593338561fcc6b2c00143280')}).then((res)=>{
       console.log(res); 
    });
    
//    db.close();
});