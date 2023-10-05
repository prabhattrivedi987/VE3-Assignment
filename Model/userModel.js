const mongoose=require('mongoose');

//user schema
 const userSchema = new mongoose.Schema({
   username: {
     type: String,
     required: [true, "This is a required field"],
   },
   email: {
     type: String,
     required: [true, "This is a required field"],
   },
   password: {
     type: String,
     required: [true, "This is a required field"],
   },
 },
 {
    timestamps:true,
 });
 //user modal
 const User=mongoose.model('User',userSchema);

 module.exports=User;