import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `avatar-${req.body.email}.jpg`);
  },
});

const upload = multer({ storage });

export default upload;
