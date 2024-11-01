let userModel = require('../model/userSchema');
let bcrypt = require('bcrypt');
const { getMaxListeners } = require('connect-mongo');



module.exports = register=async (req, res)=>{
    const{name, email, password, confirmPassword, forgetPassword} = req.body ;
   
     let error = [];
     // making sure that password character is not less than 8
    if(password.toString().length < 8){
      error.push("You must enter atleast 8 character password");
    }

    //make sure password is not same as email
    if(email === password){
       error.push("email must not be the same as password");
    }

    if(password != confirmPassword){
        error.push("confirm password, not the same as password");
      
    }

      // making sure thgat name field is not empty
    if(name.toString().length < 1){
        error.push("name field must not be blank");
      }
     // mainkg sure the email field contains '@'
    if(email.toString().includes('@') == false){
        error.push("email must contain '@'");
      }

    // To check to see if username already exist
    let user = await userModel.findOne({email : email})
        if(user){
            error.push(email + " already exist");
            console.log(email + " already exist");
         }

        
    

     // if no erroror, pls insert into the database
    if(error.length < 1){
   // hashing the password
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);

    let aUser = new userModel({name,email,password:hashPassword,forgetPassword});

    aUser.save().then((data)=>{
        // console.log(data);
        res.status(200).send(name + " was registered successfully")
    
    });
    }else{
      res.status(200).send(error);
    }
  
  }


//  post login controller
module.exports = login = async (req, res, next)=>{
    // res.status(200).send('login reached');
    const{email, password, status} = req.body;

    // if already login, pls redirect
    if(req.session.setLogin == true){
      res.redirect('/');
    }else{

      
    if( password.length < 1 || email.length < 1){
      console.log("email/password must not be empty");
      res.status(200).send("email/password must not be empty");

    }else{
     
      let data = await userModel.findOne({email}).exec();
       
      await bcrypt.compare(password, data.password, (err, isMatch)=>{
          if(isMatch){
             req.session.setLogin = true;
              req.session.user = data;
              // console.log(req.session);
              res.status(200).send({isLogin: req.session.setLogin, user: req.session.user } );
              console.log(isMatch);
              
          }else{
              res.status(200).send("email or/and password does not exist");
                     console.log("email or/and password does not exist");
          }
      });
    
    }
       
    }
   
}

// logout controller
module.exports = logout = (req, res)=>{
  req.session.setLogin = false ;
  req.session.destroy(()=>{
  //  res.cookie({maxAge: 0});
      res.redirect('/');
      console.log("You are Logout");
  });
 
  
}

        
    