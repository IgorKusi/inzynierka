import { Router } from "express";

import {
    createUser,
    getUsers,
    loginUser,
    me
} from "../controllers/userController.js";

import {
    authMiddleware
} from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", createUser);

router.get("/", getUsers);

router.post("/login", loginUser);

router.get("/me", authMiddleware, me);

export default router;