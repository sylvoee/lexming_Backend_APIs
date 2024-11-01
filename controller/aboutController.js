require('../controller/profileController');

module.exports = about = (req, res)=>{
  
    if(typeof(req.session.user) != 'undefined'){
      res.status(200).send({isLogin:req.session.setLogin,page: 'About page', user:req.session.user});
      console.log("About Page" + req.session.user.name + " is login ")
      console.log(req.session.setLogin);
    }else{
      res.status(200).send("about page");
    }
   
  }
