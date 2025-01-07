const { emit } = require('nodemon');
let profileModel = require('../model/profileSchema');
let userModel = require('../model/userSchema');
const { EventEmitterAsyncResource } = require('connect-mongo');


module.exports = profile = async(req, res)=>{

    // if already login, pls redirect
    if(req.session.setLogin == false){
      res.send("You can't create a profile until you login")
    }else{
     let ID = req.session.user._id;
      let docs = await profileModel.findOne({user: ID }).exec();
    
      if(docs){
        // to check if profile already
             res.send("You are ready have a profile");
         }else{

    let{
        DOB ,
        skinColor ,
        height ,
        nationality ,
        state,
        stateYouAreLiving  ,
        occupation  ,
        highestLevelOfEducation  ,
        mobileNumber : Integer ,
        yourIdealweekend,
        yourGoal ,
        yourPassion ,
        yourRoleModel ,
        disability ,
        bodyType ,
        relationship ,
        yourIdeaPerson ,
        physicalConnection ,
        yourPreferedTypeOfRelaionship  ,
        religion ,
        spookenLang ,
        descriptionYourPerson,

        gender,
        yourIdealPartner,
        YourFavouriteFood ,
        YourfavouriteMovie,
        yourKindOfMusic,
        placeOfBirth,
        universityOrPlaceOfWork ,
        photos,
        profilePix

    
    } = req.body ;

    if(Object.keys(req.body).length > 0  ){

    // insert into dtabase
    let aProfile = new profileModel({
       
      DOB ,
      skinColor ,
      height ,
      nationality ,
      state,
      stateYouAreLiving  ,
      occupation  ,
      highestLevelOfEducation  ,
      mobileNumber : Integer ,
      yourIdealweekend,
      yourGoal ,
      yourPassion ,
      yourRoleModel ,
      disability ,
      bodyType ,
      relationship ,
      yourIdeaPerson ,
      physicalConnection ,
      yourPreferedTypeOfRelaionship  ,
      religion ,
     spookenLang ,
     descriptionYourPerson ,

    gender,
    yourIdealPartner,
    YourFavouriteFood ,
    YourfavouriteMovie,
    yourKindOfMusic,
    placeOfBirth,
    universityOrPlaceOfWork ,
    photos,
    profilePix ,
    user: req.session.user._id
        
    });

    // check to see if the user is login
   if(req.session.setLogin == true ){
    aProfile.save().then((data)=>{
      // console.log(data);
      res.status(200).send(req.session.user.name + " Profile submitted")
  });
   }else{
    res.send("You must be login to create a profile")
   }
    
    }else{
      res.send("All fields must not be empty");
      console.log("All fields must not be empty");
    }

        }

   }

}


  // Update Userprofile c
  module.exports =  updateProfile = async (req, res, next)=>{
    
    // To check if you are login
    if(req.session.setLogin == false){
      res.send("You can't edit profile if you are ot login")
    }else{
    let{
        DOB ,
        skinColor ,
        height ,
        nationality ,
        state,
        stateYouAreLiving  ,
        occupation  ,
        highestLevelOfEducation  ,
        mobileNumber : Integer ,
        yourIdealweekend,
        yourGoal ,
        yourPassion ,
        yourRoleModel ,
        disability ,
        bodyType ,
        relationship ,
        yourIdeaPerson ,
        physicalConnection ,
        yourPreferedTypeOfRelaionship  ,
        religion ,
       spookenLang ,
       descriptionYourPerson,
        gender,
        yourIdealPartner,
        YourFavouriteFood ,
        YourfavouriteMovie,
        yourKindOfMusic,
        placeOfBirth,
        universityOrPlaceOfWork ,
        photos,
        profilePix 

    } = req.body ;
    // Updated User Model
    let edit = await profileModel.findOneAndUpdate({user:req.session.user._id},
        {
            DOB ,
            skinColor ,
            height ,
            nationality ,
            state,
            stateYouAreLiving  ,
            occupation  ,
            highestLevelOfEducation  ,
            mobileNumber : Integer ,
            yourIdealweekend,
            yourGoal ,
            yourPassion ,
            yourRoleModel ,
            disability ,
            bodyType ,
            relationship ,
            yourIdeaPerson ,
            physicalConnection ,
            yourPreferedTypeOfRelaionship  ,
            religion ,
           spookenLang ,
           descriptionYourPerson ,

          gender,
          yourIdealPartner,
          YourFavouriteFood ,
          YourfavouriteMovie,
          yourKindOfMusic,
          placeOfBirth,
          universityOrPlaceOfWork ,
          photos,
          profilePix ,
    });

    try{
      edit = await edit.save();
        res.status(200).send(`${req.session.user.name} was updated succcessfully`);
        console.log(`${req.session.user.name} was updated succcessfully`)
    }
    catch(error){
        res.status(200).send(error);
         console.log(error);
    }
  }
    
 }



  // read al Profiles
  module.exports = viewAllProfile  =(req, res)=>{
    
    module.exports =  getAllProfile = async()=>{
      // read all Profile
      let docs = await profileModel.find({}).populate('user').exec();
      try {
          res.status(200).json({docs});
          // console.log(docs);
      } catch (error) {
            res.status(200).send("No record found/ error")
           
      }
      
  }

  // calling the function
  getAllProfile();
  
      
    }

  // read al Profiles
  module.exports = viewAProfile  = async(req, res)=>{
    // res.send("route reached")
    // check to see if the Id is equal ro 24 characters
    if((req.params.id).length != 24){
      res.send("wrong URL/ID");
    }else{
    // read all Profile
    let docs = await profileModel.find({user: req.params.id}).populate('user').exec();
    try {
        res.status(200).send({docs});
        // console.log(docs);
    } catch (error) {
          res.status(200).send("No record found/ error")
         
    }
  }
      
    }