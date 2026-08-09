import "dotenv/config";

import multer from "multer";
import path from "path";
import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/uploadRoutes.js";
import advertisementRoutes from "./routes/advertisementRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import voucherRoutes from "./routes/voucherRoutes.js";

const app = express();


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


app.use(cors());
app.use(express.json({limit: "20mb"}));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/vouchers", express.static(path.join(process.cwd(), "vouchers")));
app.use("/advertisements", advertisementRoutes);
app.use("/upload", uploadRoutes);
app.use("/voucher", voucherRoutes);
app.use("/coupons", couponRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.get("/", (req, res) => {res.send("AdGame Backend Running");});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});