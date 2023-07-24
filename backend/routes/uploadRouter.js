import multer from "multer";
import express from "express";
import { isAuth } from "../util.js";

const uploadRouter = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Vérifiez si le type de fichier est accepté
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "video/mp4" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non pris en charge"), false);
  }
};
const upload = multer({ storage, fileFilter });

uploadRouter.post("/", isAuth, upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

uploadRouter.post("/file", upload.single("file"), (req, res) => {
  res.send(`/${req.file.path}`);
});

uploadRouter.post("/multi", isAuth, (req, res) => {
  upload.array("images", 5)(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      // Une erreur de téléchargement s'est produite
      res.status(400).send(error.message);
    } else if (error) {
      // Une autre erreur s'est produite
      res.status(500).send(error.message);
    } else {
      // Téléchargement réussi
      const paths = req.files.map((file) => `/${file.path}`);
      res.send(paths);
    }
  });
});

export default uploadRouter;
