const photoModel = require('../model/photoSchema');
let photoSchema = require('../model/photoSchema');
let fs = require('fs');

const multer  = require('multer')
// upload
module.exports = upload = multer({ dest: 'uploads/' })

module.exports = uploadPhoto = (req, res)=>{
     
    let aPhoto = new photoModel({
        photoName : req.file.filename,
        profilePhoto : 'none' ,
        profile : req.session.user._id
    });

    try {
         aPhoto.save() ;
        res.send("photo upload successful");
    } catch (error) {
        res.send({err : error});
    }
  
  }

    // read all photo
    module.exports = viewPhoto  = async(req, res)=>{

        // read all Photo
        let docs = await photoModel.find({}).populate('profile').exec();
        try {
            res.status(200).send({docs});
            // console.log(docs);
        } catch (error) {
              res.status(200).send("No record found/ error")     
        }
         
        }

        // delete photo
        module.exports = deletePhoto = async(req, res)=>{
          let ID =req.body.photoName; ;
          console.log(ID);
          try {
            let dPhoto = await photoModel.findOneAndDelete({photoName : ID});
            const path = './uploads/'+ ID; 
            fs.unlinkSync(path)
          } catch (error) {
            res.send(error)
          }

          res.send("photo deleted");
              
        }
