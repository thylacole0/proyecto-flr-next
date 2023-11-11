const express = require('express');
const multer = require('multer');
const pool = require("./database/db.js");
const app = express();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });


app.listen(3000, () => {
  console.log('Server started on port 3000');
});