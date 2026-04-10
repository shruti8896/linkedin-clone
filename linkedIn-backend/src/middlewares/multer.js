import multer from "multer";

const upload = multer({ storage });

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(nuoll, "./public");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});

export default upload;