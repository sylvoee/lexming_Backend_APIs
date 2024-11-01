const mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
    id: {type:mongoose.Schema.Types.ObjectId},

    sender : {type:mongoose.Schema.Types.ObjectId},
    receiver: {type:mongoose.Schema.Types.ObjectId},
    message : String,
    photoName : String,
    msgStatus : String ,
    time : {type: Date, default: Date.now()},

});

let messageModel = mongoose.model('message', messageSchema);
module.exports = messageModel ;