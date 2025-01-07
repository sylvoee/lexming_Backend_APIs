let userModel = require('../model/userSchema');
let bcrypt = require('bcrypt');
const { getMaxListeners } = require('connect-mongo');



module.exports = register=async (req, res)=>{
    // if already login, pls redirect
    if(req.session.setLogin == true){
      res.redirect('/');
    }else{
  let error = [];

  if(Object.keys(req.body).length > 0 ){
    console.log("bad input");
    res.send("No input field should be empty");
  }else{


       const{name, email, password, confirmPassword, forgetPassword} = req.body ;

     if(!password){
      error.push("password field must not be empty");
     }

     // making sure that password character is not less than 8
    if(password.toString().length < 8){
      error.push("You must enter atleast 8 character password");
    }

    //make sure password is not same as email
    if(email === password){
       error.push("email must not be the same as password");
    }

    if(!email){
      error.push("email field must not be empty");
     }

    if(password != confirmPassword){
        error.push("confirm password, not the same as password");
      
    }

    if(!name){
      error.push("password field must not be empty");
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
      try {
        // hashing the password
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);

    let aUser = new userModel({name,email,password:hashPassword,forgetPassword});
      // saving data into database
    aUser.save().then((data)=>{
        // console.log(data);
        res.status(200).send(name + " was registered successfully")
    
    });
      } catch (err) {
        console.log(err) ;
      }

    }else{
      res.status(200).send(error);
    }
  
  }
}
  
  }


//  post login controller
module.exports = login = async (req, res, next)=>{
// If already login, redirect to home page
if(req.session.setLogin == true){
  res.redirect('/');
}else{

  const{email, password, status} = req.body;

  // if already login, pls redirect
  if(req.session.setLogin == true){
    res.redirect('/');
  }else{

  if(typeof password == 'undefined'||typeof email == 'undefined'){
    console.log("email/password must not be empty");
    res.status(200).send("email or password must not be empty");

  }else{
   
    try {
      
  // Array to store errror
  let error = [];
  let data = await userModel.findOne({email}).exec();
   
  // if email exist , query the database
 if(data){
  let isMatch = await bcrypt.compare(password, data.password);
  
  // if user exist check for password
      if(isMatch){
        //  using sessions
         req.session.setLogin = true;
         const{_id, name, email,status, createdAt} = data ;
         let aUser = {_id ,name, email, status, createdAt} ;
          req.session.user = aUser;
          
          // console.log(req.session);
          res.status(200).send({isLogin: req.session.setLogin, user: req.session.user } );
          console.log(isMatch);
          
      }else{
        // if password does not exist
          error.push("Incorrect password");
                res.send(error);
      }
 }else{
  error.push("Invalid username or email");
  res.send(error);
 }


    } catch (err) {
      console.log(err)
    }

    
  
  }
     
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

        
    