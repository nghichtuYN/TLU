const multer = require("multer");
const path = require("path");
const uploadDirectory = path.join(__dirname, '../public/uploads')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  const upload = multer({ storage: storage });
  module.exports={upload}