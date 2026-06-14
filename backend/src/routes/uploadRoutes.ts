import { Router } from "express";
import multer from "multer";

import { uploadImage } from "../controllers/uploadController.js";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            `${Date.now()}-${file.originalname}`
        );
    }
});

const upload = multer({
    storage
});

router.post("/", upload.single("image"), uploadImage);

export default router;