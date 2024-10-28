

let express = require('express');
const homeController = require('./controller/homeController');
const aboutController = require('./controller/aboutController');
const userController = require('./controller/userController');
const profileController = require('./controller/profileController');
const photoController = require('./controller/photoController');

let router = express.Router()

// HTTP request 
   router.get('/', home);
   router.get('/about', about);
  
  router.post('/register', register);
  router.post('/login', login);
  router.get('/logout', logout);

  router.get('/profile/:id', viewProfile);
  router.post('/profile', profile);
  router.put('/update-profile', updateProfile);

  router.post('/upload-photo', upload.single('fileName'), uploadPhoto);
  router.get('/view-photos',viewPhoto);

  module.exports = router ;