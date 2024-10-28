
module.exports = home = (req, res)=>{
  
    if(typeof(req.session.user) != 'undefined'){
      res.status(200).send({login: req.session.user.name ,isLogin:req.session.setLogin,page: 'Home page', user:req.session.user});
    }else{
      res.status(200).send("Home page");
    }
   
  }