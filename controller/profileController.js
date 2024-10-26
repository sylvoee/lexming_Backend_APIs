const { emit } = require('nodemon');
let profileModel = require('../model/profileSchema');
let userModel = require('../model/userSchema');


module.exports = profile = (req, res)=>{

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
        descriptionYourPerson
      
    
    } = req.body ;
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
         user: req.session.user._id
        
    });

    aProfile.save().then((data)=>{
        // console.log(data);
        res.status(200).send(req.session.user.name + " Profile submitted")
    });
    

}


  // Update Userprofile c
  module.exports =  updateProfile = async (req, res, next)=>{
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
       descriptionYourPerson 
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
           descriptionYourPerson 
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

  // read all Profiles
  module.exports = viewProfile  = async(req, res)=>{
    // res.send("route reached")
    console.log(req.params.id);
    // read all Profile
    let docs = profileModel.find({}).exec();
      if(!docs){
          res.status(200).send({err:docs})
          // res.render('allComment', {err:docs});
          console.log(!docs)
      }
      if(docs){
          res.status(200).send( {docs: docs});
          // console.log(docs);
        
    
      }
    }