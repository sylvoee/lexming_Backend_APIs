const mongoose = require('mongoose');

let profileSchema = mongoose.Schema({
    id: {type:mongoose.Schema.Types.ObjectId},
    DOB : Date,
    skinColor : String,
    height : String,
    nationality : String,
    state: String,
    stateYouAreLiving : String ,
    occupation : String ,
    highestLevelOfEducation : String ,
    mobileNumber : Number ,
    

    
    yourIdealweekend: String,
    yourGoal : String,
    yourPassion : String,
    yourRoleModel : String,
    disability : String,
    bodyType : String,
    relationship : String,
    yourIdeaPerson : String,
    physicalConnection :String,
    yourPreferedTypeOfRelaionship : String ,

     
    
  user:{
    ref:'User',
    type:mongoose.Schema.Types.ObjectId, 
    unique:true
  },
  createdAt: {type: Date, default: Date.now}
});

let profileModel = mongoose.model('profile', profileSchema);
module.exports = profileModel ;