

let express = require('express');

const userController = require('./controller/userController');
const profileController = require('./controller/profileController');

let router = express.Router()

// HTTP request 
   router.get('/', home);
  
  router.post('/register', register);
  router.post('/login', login);
  router.get('/logout', logout);

  router.get('/view-profile/:id', viewProfile);
  router.post('/profile', profile);
  router.put('/update-profile', updateProfile);

  module.exports = router ;