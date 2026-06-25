import express from "express";
import multer from "multer";
import path from "path";

import { uploadVoucher } from "../controllers/voucherController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(
            null,
            path.join(process.cwd(), "vouchers")
        );
    },

    filename: (req, file, cb) => {
        cb(
            null,
            `${Date.now()}.png`
        );
    }
});

const upload = multer({
    storage
});

router.get("/", (req, res) => {
    res.send("Voucher GET działa");
});

router.post(
    "/upload",
    upload.single("voucher"),
    uploadVoucher
);

export default router;