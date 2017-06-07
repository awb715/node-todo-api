var env = process.env.NODE_ENV || 'development';


if (env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/Todoapp';
}else if (env ==='test'){
   process.env.PORT = 3000; 
    process.env.MONGODB_URI = 'mongodb://localhost:27017/Todoapptest'
}

//if we reun npm test, weare using Todoapp test locally
// if we reun npm start, we are in development environment because env will be set to development