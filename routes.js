

let express = require('express');
const homeController = require('./controller/homeController');
const aboutController = require('./controller/aboutController');
const userController = require('./controller/userController');
const profileController = require('./controller/profileController');
const photoController = require('./controller/photoController');
const messageController = require('./controller/messageController');
const mailController = require('./controller/mailController');

let router = express.Router()

// HTTP request 
   router.get('/', home);
   router.get('/about', about);
  
  router.post('/register', register);
  router.post('/login', login);
  router.get('/logout', logout);

  router.get('/a-profile/:id', viewAProfile);
  router.get('/all-profile', viewAllProfile);
  router.post('/profile', profile);
  router.put('/update-profile', updateProfile);

  router.post('/upload-photo', upload.single('photo'), uploadPhoto);
  router.get('/view-photos',viewPhoto);
  router.delete('/delete-photo', deletePhoto);

  router.post('/post-message', postMessage);
  router.get('/view-messages',viewMessages);
  router.delete('/delete-message', deleteMessage);

  router.get('/send-mail', mailer);


  module.exports = router ;