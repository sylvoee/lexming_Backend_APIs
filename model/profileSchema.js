const mongoose = require('mongoose');

let profileSchema = mongoose.Schema({
    id: {type:mongoose.Schema.Types.ObjectId},
    DOB : String,
    skinColor : String,
    height : String,
    nationality : String,
    state: String,
    stateYouAreLiving : String ,
    occupation : String ,
    highestLevelOfEducation : String ,
    mobileNumber : String ,
    
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

    gender: String,
    yourIdealPartner :String,
    YourFavouriteFood : String,
    YourfavouriteMovie: String,
    yourKindOfMusic: String,
    placeOfBirth: String,
    universityOrPlaceOfWork : String,
    photos: String,
    profilePix : String,

  user:{
    ref:'User',
    type:mongoose.Schema.Types.ObjectId, 
    unique:true
  },
  createdAt: {type: Date, default: Date.now}
});

let profileModel = mongoose.model('Profile', profileSchema);
module.exports = profileModel ;