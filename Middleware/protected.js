const protected=async(req,res,next)=>{
    if (!req.session.loginUser) {
      
      res.status(401).render('notallowed');
    }
    next();
}

module.exports=protected;