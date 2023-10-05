const mongoose=require('mongoose');

//todo schema
const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    }
},
{
    timestamps:true,
})
//todo model
const Todo=mongoose.model('Todo',todoSchema);

module.exports=Todo;