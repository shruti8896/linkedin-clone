import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("destination called");
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    console.log("fileName called");
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
