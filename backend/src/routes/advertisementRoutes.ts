import { Router } from "express";

import {
    createAdvertisement,
    getAdvertisementById,
    getGameAdvertisement,
    getAllAdvertisements,
    deleteAdvertisement
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
    "/:id",
    getAdvertisementById
);
router.delete("/:id", deleteAdvertisement);
export default router;