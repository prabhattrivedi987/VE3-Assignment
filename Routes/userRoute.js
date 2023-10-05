const express=require('express');
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../Controller/userController");

const userRouter=express.Router();

//user signup page
userRouter.get('/signup',(req,res)=>{
    res.render('signupUser');
})

//create user into databae
userRouter.post('/createuser',createUser);

//user login page
userRouter.get('/login',(req,res)=>{
    res.render('loginUser');
})
//login User
userRouter.post('/loginuser',loginUser);

//logout user
userRouter.get('/logoutuser',logoutUser);

module.exports=userRouter;