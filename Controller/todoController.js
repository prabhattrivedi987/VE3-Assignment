 const express=require('express');
const Todo = require('../Model/todoModal');

//create todo in database
const createTodo = async (req, res) => {
  try {
  console.log(req.body);
    const { title, desc } = req.body;
    const newTodo=await Todo.create({
        title,
        desc,
    });
        res.status(201).redirect("http://localhost:8080/login");

  } catch (error) {
        res.status(500).json({
            status:"failed",
            message:"error while creating todo "+error.message,
        })
  }
};

//fetching all todos from database
const allTodos= async(req,res)=>{
    try {
      const allTodos = await Todo.find({});
      res.status(200).render("alltodos", {
        allTodos: allTodos,
      });
    } catch (error) {
        res.status(500).json({
          status: "failed",
          message: "error while creating todo " + error.message,
        });
    }
}

//update page
const updatepage= async(req,res)=>{
  try {
    console.log(req.params.id);
    const todo=await Todo.findOne({_id:req.params.id});
    console.log(todo);
    res.render('update',{
      data:todo,
    })
  } catch (error) {
    
  }
}

//update todo in database
const updateTodo=async(req,res)=>{
    try {
        console.log(req.params.id);
        console.log(req.body);
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body,{
          new: true,
          runValidators: true,
        });
        res.status(202).redirect("http://localhost:8080/alltodos");
    } catch (error) {
        res.status(500).json({
          status: "failed",
          message: "error while updating todo " + error.message,
        });
    }
}

//delete todolist 
const deleteTodo=async(req,res)=>{
    try {
      const id=req.params.id;
        const deletedTodo=await Todo.findByIdAndDelete(id);
        res.status(200).redirect("http://localhost:8080/alltodos");
    } catch (error) {
        res.status(500).json({
          status: "failed",
          message: "error while deleting todo " + error.message,
        });
    }
}

module.exports = {
  createTodo,
  allTodos,
  updateTodo,
  deleteTodo,
  updatepage,
};