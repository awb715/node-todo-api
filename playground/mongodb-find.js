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
    
//db.collection('Todos').find({
//    _id:new ObjectID('593334ca02f3052bed805e92')}
//                           ).toArray().then((docs)=>{
//    console.log('Todos');
//    console.log(JSON.stringify(docs, undefined, 2));
//},(err)=>{
//   console.log('Unable to fetch todos', err)
//  });
//    
    
//    db.collection('Todos').find().count().then((count)=>{
//  console.log(`Todos Count:${count}`);
//},(err)=>{
//   console.log('Unable to fetch todos', err)
//  });
    
    db.collection('Users').find({Age:22}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs, undefined,3));
    },(err)=>{console.log('Unable to fetch', err)});
    
    
//    db.close();
});