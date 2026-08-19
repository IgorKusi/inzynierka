import { Router } from "express";

import {
    authMiddleware
}
    from "../middleware/authMiddleware.js";

import {
    adminOnly
}
    from "../middleware/adminMiddleware.js";

import {
    getAdminStats,
    getAllUsers,
    getAdminAdvertisements,
    deleteAdminAdvertisement
}
    from "../controllers/adminController.js";

const router = Router();


router.get(
    "/stats",
    authMiddleware,
    adminOnly,
    getAdminStats
);


router.get(
    "/users",
    authMiddleware,
    adminOnly,
    getAllUsers
);


router.get(
    "/advertisements",
    authMiddleware,
    adminOnly,
    getAdminAdvertisements
);


router.delete(
    "/advertisements/:id",
    authMiddleware,
    adminOnly,
    deleteAdminAdvertisement
);


export default router;