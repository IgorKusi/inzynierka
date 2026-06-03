import { Router } from "express";

import {
    createAdvertisement,
    getAdvertisementById,
    getGameAdvertisement
} from "../controllers/advertisementController.js";

const router = Router();

router.post("/", createAdvertisement);

router.get("/:id", getAdvertisementById);

router.get("/game/:id", getGameAdvertisement
);

export default router;