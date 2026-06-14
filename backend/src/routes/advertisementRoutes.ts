import { Router } from "express";

import {
    createAdvertisement,
    getAdvertisementById,
    getGameAdvertisement,
    getAllAdvertisements,
    deleteAdvertisement,
    getAdvertisementCoupons,
    updateAdvertisement
} from "../controllers/advertisementController.js";

const router = Router();

router.post(
    "/",
    createAdvertisement
);

router.get(
    "/game/:id",
    getGameAdvertisement
);

router.get(
    "/",
    getAllAdvertisements
);

router.get(
    "/:id/coupons",
    getAdvertisementCoupons
);

router.get(
    "/:id",
    getAdvertisementById
);

router.put(
    "/:id",
    updateAdvertisement
);

router.delete("/:id", deleteAdvertisement);
export default router;