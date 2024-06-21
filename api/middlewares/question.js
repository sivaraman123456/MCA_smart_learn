import multer from "multer";

import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify where to store the files
      cb(null, './questions');
    },
    filename: function (req, file, cb) {
      // Generate unique file names
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize multer with the storage options
  const question_upload = multer({ storage: storage });


  export default question_upload;