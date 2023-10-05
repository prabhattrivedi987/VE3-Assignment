const express=require('express');
const {
  createTodo,
  allTodos,
  updateTodo,
  deleteTodo,
  updatepage,
} = require("../Controller/todoController");
const protected=require('../Middleware/protected');

const todoRouter=express.Router();

//create todo  page
todoRouter.get("/create", (req, res) => {
  res.render("createTodo");
});

//create todo in database
todoRouter.post('/createtodo',createTodo);

// //all todos page
// todoRouter.get('/alltodos',(req,res)=>{
//     res.render('alltodos');
// })

//fetch all data from todo 
todoRouter.get("/alltodos",protected, allTodos);

//update page
todoRouter.get('/update/:id',updatepage);

//update todo in database
todoRouter.post('/updatetodo/:id',updateTodo);

//delete todo list
todoRouter.get('/deletetodo/:id',deleteTodo);

module.exports=todoRouter;