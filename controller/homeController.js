
const profileController = require('../controller/profileController');
const profileModel = require('../model/profileSchema');


module.exports = home = async(req, res)=>{

    // read all Profile
    let docs = await profileModel.find({}).populate('user').exec();
    try {
    if(typeof(req.session.user) != 'undefined'){
      res.status(200).send({login: req.session.user.name ,
        isLogin:req.session.setLogin,page: 'Home Page',
         user:req.session.user, docs:docs
        });
    }else{
      res.status(200).send({home :"Home Page..."});
    }
    } catch (error) {
          res.status(200).send("No record found/ error")
         
    }
    



    

   
  }