let userModel = require('../model/userSchema');
let bcrypt = require('bcrypt');


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

    let aUser = new userModel({name,email,password:hashPassword,forgetPassword, status : 'admin@user'});

    aUser.save().then((data)=>{
        // console.log(data);
        res.send(name + " was registered successfully")
    });
    }else{
      res.send(error);
    }


      
  }


//  post login controller
module.exports = login = async (req, res)=>{
    // res.send('login reached');
    const{email, password, status} = req.body;
    
    if(status == 'admin@user'){
      let data = await userModel.findOne({email, status: 'admin@user'}).exec();
        if(data != null || data ){ 
            bcrypt.compare(password, data.password, (err, isMatch)=>{
                if(isMatch){
                   setLogin = true;
                    req.session.user = data;
                    // console.log(req.session);
                    res.send(email + " is login " + req.session.user);
                    
                }else{
                    res.send("email or/and password does not exist");
                           console.log("email or/and password does not exist");
                }
            })
            
        }
      
      else if(!data || email == ''|| password == ''){
          res.send("email or/and password does not exist");
        }

    
    }
    
   if(status != 'admin@user'){
    let data = await userModel.findOne({email}).exec() ;
    
  
      if(data != null || data ){ 
          bcrypt.compare(password, data.password, (err, isMatch)=>{
              if(isMatch){
                 setAdminLogin = true;
                  req.session.user = data;
                  res.send('user', {aUser:req.session.user});
                  console.log("setAdminLogin is " + setAdminLogin);
              }else{
                  res.send('login', {msg: "email or/and password does not exist"});
                         console.log("email or/and password does not exist");
              }
          })
          
      }
    
    else if(!data || email == ''|| password == ''){
        res.render('login', {msg: "email or/and password does not exist"});
        console.log("Email or/and password does not exist");
      }


   }
    
}

// logout controller
module.exports = logout = (req, res)=>{
  req.session.destroy(()=>{
  //  res.cookie({maxAge: 0});
      res.redirect('/');
      console.log("You are Logout");
  });
 
  
}

        
    