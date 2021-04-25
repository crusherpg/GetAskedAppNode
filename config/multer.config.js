const multer = require("multer");
const constants = require("../constants");
const fs = require("fs");

if (!fs.existsSync(constants.fileUploadPath)) {
  fs.mkdirSync(constants.fileUploadPath);
}

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, constants.fileUploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

module.exports = upload;
