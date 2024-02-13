import fs from "fs";
import multer from "multer";


// img storage path
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
  
  // img filter
  const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(new Error("only images is allowed"));
    }
  };
  
  const UploadImagesMulter = multer({
    storage: imgconfig,
    fileFilter: isImage,
  });

  export default UploadImagesMulter;