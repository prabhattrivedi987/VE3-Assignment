const express=require('express');
const bcrypt=require('bcryptjs');
const User=require('../Model/userModel');

//create user into database
const createUser=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        //check if user alredy exist
        const userFound=await User.findOne({email});
        if(userFound){
            return res.status(200).json({
                status:"failed",
                message:"User Already Found, Please Login"
            })
        }
        //generate salt
        const salt=await bcrypt.genSalt(10);
        //hasing password
        const hashPassword=await bcrypt.hash(password,salt);
        const newUser=await User.create({
            username,
            email,
            password:hashPassword,
        })

        req.session.loginUser=newUser;
        res.render('loginUser');
    } catch (error) {
        res.status(500).json({
            status:"failed",
            message:"Error while creating User into Database "+error.message,
        })
    }
}
//verify login
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //check for email
        const userFound=await User.findOne({email});
        if(!userFound){
            return res.status(500).json({
                status:"failed",
                message:"Invalid Login Credentials"
            })
        }
        //check for password
        const isValidPassword=await bcrypt.compare(password,userFound.password);
        if(!isValidPassword){
            return res.status(500).json({
              status: "failed",
              message: "Invalid Login Credentials",
            });
        }
        req.session.loginUser=userFound;
        res.redirect('http://localhost:8080/alltodos');
    } catch (error) {
        res.status(500).json({
            status:"success",
            message:"Error while verify login User "+error.message,
        })
    }
}

//logout user
const logoutUser=async(req,res)=>{
    req.session.destroy();
        res.redirect("http://localhost:8080/create");
}
module.exports = {
  createUser,
  loginUser,
  logoutUser,
};