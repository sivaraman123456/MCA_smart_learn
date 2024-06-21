import multer from "multer";

import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify where to store the files
      cb(null, './files');
    },
    filename: function (req, file, cb) {
      // Generate unique file names
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize multer with the storage options
  const upload = multer({ storage: storage });


  export default upload;