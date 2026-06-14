import { Router } from "express";

import {
    generateCoupon,
    getCoupon,
    useCoupon,
    getCouponQr,
    getCoupons
}
    from "../controllers/couponController.js";

const router = Router();

router.post("/generate", generateCoupon);

router.get("/", getCoupons);

router.get("/:code", getCoupon);

router.post("/redeem/:code", useCoupon);

router.get("/qr/:code", getCouponQr);

export default router;