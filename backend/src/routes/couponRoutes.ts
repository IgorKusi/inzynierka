import { Router } from "express";

import {
    generateCoupon,
    getCoupon,
    useCoupon
}
    from "../controllers/couponController.js";

const router = Router();

router.post(
    "/generate",
    generateCoupon
);

router.get(
    "/:code",
    getCoupon
);

router.post(
    "/redeem/:code",
    useCoupon
);

export default router;