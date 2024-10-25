

let express = require('express');

const userController = require('./controller/userController');
let router = express.Router()

// HTTP request - GET
router.get('/', (req, res)=>{
  if(typeof(req.session.user) != 'undefined'){
    res.send(req.session.user);
  }else{
    res.send("Home page");
  }
 
  
  });
  
  router.post('/register', register);
  router.post('/login', login);
  router.get('/logout', logout);

  module.exports = router ;