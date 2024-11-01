
let messageModel = require('../model/messageSchema');
let fs = require('fs');

module.exports = postMessage = (req, res)=>{
  
     let{message, receiver, msgStatus} = req.body ;
       console.log(req.filename);
    let aMessage = new messageModel({
        sender : req.session.user._id,
        receiver,
        message ,
        msgStatus
    });

    try {
         aMessage.save() ;
        res.send("Message sent successfully");
    } catch (error) {
        res.send({err : error});
    }
  
  }

    // read all Message
    module.exports = viewMessages  = async(req, res)=>{

        // read all Message
        let docs = await messageModel.find({});
        try {
            res.status(200).send({docs});
            // console.log(docs);
        } catch (error) {
              res.status(200).send("error in fetching message")     
        }
         
        }

        // delete message
        module.exports = deleteMessage = async(req, res)=>{

          let ID = req.body.id ;
      
          try {
            let dMessage = await messageModel.findByIdAndDelete(ID);
            res.send("message deleted");
          } catch(error) {
            res.send(error)
          }

       
              
        }
