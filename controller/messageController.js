
let messageModel = require('../model/messageSchema');


module.exports = postMessage = (req, res)=>{
     let{message, receiver, msgStatus} = req.body ;

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
    module.exports = viewMessage  = async(req, res)=>{

        // read all Message
        let docs = await messageModel.find({}).populate('profile').exec();
        try {
            res.status(200).send({docs});
            // console.log(docs);
        } catch (error) {
              res.status(200).send("error in fetching message")     
        }
         
        }

        // delete message
        module.exports = deleteMessage = async(req, res)=>{

            // ftech from collection
            let docs = await messageModel.find({}).exec()
            res.send(docs);
            
        //   let ID =req.body.id ;
        //   try {
        //     let dMessage = await messageModel.findOneAndDelete({id : ID});
        //     res.send("message deleted");
        //   } catch(error) {
        //     res.send(error)
        //   }

       
              
        }
