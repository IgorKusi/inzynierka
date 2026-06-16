import { Router } from "express";
import {
    authMiddleware,
}
    from "../middleware/authMiddleware.js";
import {
    createAdvertisement,
    getAdvertisementById,
    getGameAdvertisement,
    getAllAdvertisements,
    deleteAdvertisement,
    getAdvertisementCoupons,
    updateAdvertisement,
    getMyAdvertisements,
    getAdvertisementStats,
    getMyAdvertisementStats,
    registerLaunch,
    getQrCode
} from "../controllers/advertisementController.js";

const router = Router();

router.post("/", authMiddleware, createAdvertisement);

router.get("/game/:id", getGameAdvertisement);

router.get("/", getAllAdvertisements);

router.get("/:id/coupons", getAdvertisementCoupons);

router.get("/my/stats", authMiddleware, getMyAdvertisementStats);

router.get("/my", authMiddleware, getMyAdvertisements);

router.get("/:id/qr", getQrCode);

router.get( "/:id/stats", authMiddleware, getAdvertisementStats);

router.post("/:id/launch",registerLaunch);

router.get( "/:id", getAdvertisementById);

router.put( "/:id", authMiddleware, updateAdvertisement);

router.delete("/:id", authMiddleware, deleteAdvertisement);

export default router;