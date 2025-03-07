const express = require('express');
const router = express.Router();
const multer = require('multer')

const uploadDestination = "uploads"
// хронилище
const storage = multer.diskStorage({
 destination: uploadDestination,
 filename: function(req, res, cb){
  cb(null, )
 }
})


router.get('/register', (req, res) =>{
res.send('register');
})

module.exports = router; 
