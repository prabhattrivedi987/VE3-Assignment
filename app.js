require('dotenv').config();
require('./Config/dbConnect')
const express=require('express');
const path=require('path');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const todoRouter = require('./Routes/todoRoute');
const userRouter = require('./Routes/userRoute');



const app=express();

//session configuration
app.use(
  session({
    secret: process.env.SESSION_KEY||'your_secret_key',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60, //1 day
    }),
  })
);


// template engine
app.set('view engine','ejs');
app.set('views',path.resolve(path.join(__dirname,'views')));

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

//Routes
app.use(todoRouter);
app.use(userRouter);

//testing model
// const newTodo=new Todo({
//     title:"first todo",
//     desc:"first desc todo"
// });
// newTodo.save()
// .then((data)=>console.log(data))
// .catch((err)=>console.log(err))




const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})