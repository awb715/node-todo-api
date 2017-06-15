const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password ='123abc';

//bcrypt.genSalt(10 , (err, salt)=>{
//   
//    bcrypt.hash(password,salt, (err,hash)=>{
//      console.log(hash);  
//    });
//});

var hashpw = "$2a$10$94/4zCBHZF88CjVhdLwI8.mmnOxEbgdzlvymniBeIL7gGIvn6TrBu"

bcrypt.compare(password, hashpw,(err ,res)=>{
    
    console.log(res);
});


//var data = {
//    id:10
//};
//
//var token = jwt.sign(data,'secret123');
////
//console.log(token);
//
//var decoded =jwt.verify(token,'secret123');
////jwt.verify
//
//console.log('decoded', decoded);

//var message ='I am user number 1';
//
//var hash = SHA256(message).toString();
//
//console.log(`Message: ${message}`);
//console.log(`Hash: ${hash}`);

//var data = {
//    id:4  //should equal actual user id
//};
//
//var token = {
//    data,
//    hash:SHA256(JSON.stringify(data)+'secret').toString()
//}
//
//token.data.id=5;
//token.hash=SHA256(JSON.stringify(token.data)).toString();
//
//var resHash = SHA256(JSON.stringify(token.data)+'secret').toString(); //'secret is salting the hash
//
//if(resHash===token.hash){
//    console.log('data not changed');
//}else{
//    console.log('data changed');
//}