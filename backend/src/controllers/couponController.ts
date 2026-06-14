import type {Request, Response} from "express";
import {
    redeemCoupon
} from "../services/couponService.js";

import {
    createCoupon,
    getCouponByCode,
    getAllCoupons
} from "../services/couponService.js";

import {
    generateCouponQR
} from "../services/qrService.js";

export async function generateCoupon(req: Request, res: Response) {
    try {
        const advertisementId =
            Number(req.body.advertisementId);

        if (Number.isNaN(advertisementId)) {
            return res.status(400).json({
                    error:
                        "advertisementId required"
                });
        }

        const coupon =
            await createCoupon(advertisementId);

        res.json(coupon);
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            error:
                "Failed to generate coupon"
        });
    }
}


export async function getCoupon(req: Request, res: Response) {
    try {
        const code = String(req.params.code);

        const coupon =
            await getCouponByCode(code);

        if (!coupon) {
            return res
                .status(404)
                .json({
                    error:
                        "Coupon not found"
                });
        }

        res.json(coupon);
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            error:
                "Failed to load coupon"
        });
    }
}

export async function useCoupon(req: Request, res: Response) {
    try {

        const code = String(req.params.code);

        const result =
            await redeemCoupon(code);

        if (result === null) {
            return res
                .status(404)
                .json({
                    error:
                        "Coupon not found"
                });
        }

        if (result === false) {
            return res
                .status(400)
                .json({
                    error:
                        "Coupon already used"
                });
        }

        res.json(result);
    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            error:
                "Failed to redeem coupon"
        });
    }
}
export async function getCouponQr(req: Request, res: Response) {
    try {

        const code = req.params.code;

        const qrBuffer =
            await generateCouponQR(code);

        res.setHeader("Content-Type","image/png");

        res.send(qrBuffer);
    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            error:
                "Failed to generate QR"
        });
    }
}
export async function getCoupons(req: Request, res: Response) {
    try {

        const coupons =
            await getAllCoupons();

        res.json(coupons);
    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            error:
                "Failed to load coupons"
        });
    }
}