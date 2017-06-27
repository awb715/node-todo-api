const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../models/user');
const {todos,populateTodos,users,populateUsers} = require('./seed/seed');


beforeEach(populateUsers);

beforeEach(populateTodos);
describe('POST /todos',()=>{
    
   it('should create a new todo', (done)=>{
      var text = 'Test todo text';
       
      request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
          expect(res.body.text).toBe(text);
      })
      .end((err,res) => {
          if (err) { 
              return done(err);
          }
              
              Todo.find({text}).then((todos) => {
                  expect(todos.length).toBe(1);
                  expect(todos[0].text).toBe(text);
                  done();
                  
              }).catch((e)=>   done(e));
              });
      });
    
    it('should not create todo with invalid body data' , (done) =>{
       
        request(app)//supertest
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res)=>{
           if(err){return done(err);} 
            
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);  
            done();
        }).catch((e) => done(e));
        });
        
        
    });
    
   
    
    
   });

 describe('GET /todos', ()=>{
        
       it('should get all todos',(done)=>{
           
           request(app)
           .get('/todos')
           .expect(200)
           .expect((res)=>{//custom
             expect(res.body.todos.length).toBe(2);  
           })
           .end(done);
           
       }) ;
        
    });

describe('GET /todos:id', ()=>{
  
  it('should return todo doc' , (done)=>{
   
      request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
       expect(res.body.todos.text).toBe(todos[0].text) 
      })
      .end(done);
      
  }) ; 
    
    it('should return 404 if todo not found', (done)=>{
        //get 404 back
        
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });
    
    it ('should return 404 for non object ID', (done)=>{
       
        request(app)
        .get('/todos/1234')
        .expect(404)
        .end(done);
        
    });
    
    
    
});
    describe('DELETE /todos:id', ()=>{ 
        
        it('should remove a todo', (done)=>{
          var hex = todos[1]._id.toHexString();
            
            request(app)
            .delete(`/todos/${hex}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(hex);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                //query database
                
                Todo.findById(hex).then((todo)=>{
                    expect(todo).toNotExist();
                    done();
            }).catch((e)=> done(e));
            
        });
                
});
        
         it('should return 404 if todo not found', (done)=>{
            
             
         request(app)
        .delete(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
        });
        
         it('should return 404 for non objectid', (done)=>{
            
             
              request(app)
        .delete('/todos/1234')
        .expect(404)
        .end(done);
        });
        

        
    });


  describe('PATCH /todos:id', ()=>{ 
      it('should update todo' , (done)=>{
            var hex = todos[0]._id.toHexString();
           var text = "New Text";          
          
          request(app)
          .patch(`/todos/${hex}`)
          .send({
              completed:true,
              text
          })
          .expect(200)
          .expect((res)=>{
              expect(res.body.todo.text).toBe(text)
              expect(res.body.todo.completed).toBe(true);
              expect(res.body.todo.completedAt).toBeA('number')
          })
          .end(done);
      });
      
      it('should clear completedAt when todo is not completed', (done) =>{
          var hex2 = todos[1]._id.toHexString();
           var tex2 = "New Todo";   
          
          request(app)
          .patch(`/todos/${hex2}`)
          .send({
              text:tex2,
              completed:false
          })
          .expect(200)
          .expect((res)=>{
              expect(res.body.todo.text).toBe(tex2);
              expect(res.body.todo.completed).toBe(false);
              expect(res.body.todo.completedAt).toBe(null);
          })
          .end(done);
          
          
      });
          });

describe('GET /users/me', ()=>{
   it('should return user if authenticated' ,(done)=>{
       request(app)
       .get('/users/me')
       .set('x-auth',users[0].tokens[0].token)
       .expect(200)
       .expect((res)=>{
           expect(res.body._id).toBe(users[0]._id.toHexString());
           expect(res.body.email).toBe(users[0].email)
           
       })
       .end(done);
   }); 
    
    
    it('should return a 401 if not authenticated' ,(done)=>{
       request(app)
       .get('/users/me')
       .expect(401)
       .expect((res)=>{
         expect(res.body).toEqual({})  
       })
       .end(done);
   }); 
});

describe('POST /users',()=>{
  it('should create a user',(done)=>{
      var email = "aaron@example.com";
      var password = "123456";
      
      request(app)
      .post('/users')
      .send({email,password})
      .expect(200)
      .expect((res)=>{
          expect(res.headers['x-auth']).toExist();
          expect(res.body._id).toExist();
          expect(res.body.email).toBe(email);
          
      })
    
      
      .end((err)=>{
          if (err){
              return done(err);
          }
          User.findOne({email}).then((user)=>{
              expect(user).toExist();
              expect(user.password).toNotBe(password);
              done();
          })
      });
  }) ; 
    
    it('should return validation error for invalid email',(done)=>{
    
        var email = 'sdfsdfs'   //sending a non valid email
        var password = ' 123'
        
      request(app)
      .post('/users')
      .send({email,password})
      .expect(400)
      .end(done)
     
  }) ; 
    
    it('should not create user if email in user',(done)=>{
        var email = users[0].email; //sending an already existing email
        request(app)
      .post('/users')
      .send({email})
      .expect(400)
      .end(done)
    
      
    
  }) ; 
    
});
