import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// UPLOAD IMAGE
router.post("/", upload.single("image"), (req, res) => {
  res.json({ image: req.file.filename });
});

export default router;
