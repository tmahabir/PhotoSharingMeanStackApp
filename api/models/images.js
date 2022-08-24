const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  }
});


mongoose.model('Image', imageSchema);
