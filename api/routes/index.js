const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const ctrlImage = require('../controllers/image');
const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();
const storage = require('../helpers/storage');

const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//image
router.get('/images', ctrlImage.showImages);
router.post('/images', storage, ctrlImage.uploadImage);
router.delete('/images/:name', ctrlImage.deleteImage);

module.exports = router;
