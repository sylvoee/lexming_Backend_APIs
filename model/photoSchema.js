const mongoose = require('mongoose');

let photoSchema = mongoose.Schema({
    id: {type:mongoose.Schema.Types.ObjectId},
    photoName : String,
    profilePhoto: String,
    
  profile:{
    ref:'Profile',
    type:mongoose.Schema.Types.ObjectId
  },
  createdAt: {type: Date, default: Date.now}
});

let photoModel = mongoose.model('Photo', photoSchema);
module.exports = photoModel ;