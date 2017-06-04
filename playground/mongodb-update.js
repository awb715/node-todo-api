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
    
//  db.collection('Todos').findOneAndUpdate({
//    _id: new ObjectID('593379aa880890b9c1d665cd')  
//  },{
//      $set:{ //see mongoDB operator documentation
//          completed:true
//      }
//  },{
//      returnOriginal:false
//  }).then((result)=>{console.log(result);});
   
     db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("593338434ca6a12bff7e117b")  
  },{
     $set:{
      Name:'Chelsie'
    },
      $inc:{ //see mongoDB operator documentation
          Age:1
      }
  },{
      returnOriginal:false
  }).then((result)=>{console.log(result);}); 
    
    
    
//    db.close();
});