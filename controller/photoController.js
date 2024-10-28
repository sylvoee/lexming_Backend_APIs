const photoModel = require('../model/photoSchema');
let photoSchema = require('../model/photoSchema');

const multer  = require('multer')
// upload
module.exports = upload = multer({ dest: 'uploads/' })

module.exports = uploadPhoto = async(req, res)=>{
  
    console.log(req.file);
    let aPhoto = new photoModel({
        photoName : req.file.filename,
        PhotoPhoto : 'none',
        Photo : req.session.user.id
    });

    try {
        await aPhoto.save() ;
        res.send("upload photo successful");
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
