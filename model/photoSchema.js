const mongoose = require('mongoose');

let photoSchema = mongoose.Schema({
    id: {type:mongoose.Schema.Types.ObjectId},
    photoName : String,
    profilePhoto: String,
    createdAt : {type : Date, default:Date.now()},
    
//   profile:{
//     ref:'profile'
//     // type:mongoose.Schema.Types.ObjectId
//   },
  createdAt: {type: Date, default: Date.now}
});

let photoModel = mongoose.model('photo', photoSchema);
module.exports = photoModel ;