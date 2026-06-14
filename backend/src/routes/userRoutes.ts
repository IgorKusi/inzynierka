import { Router } from "express";

import {
    createUser,
    getUsers,
    loginUser
} from "../controllers/userController.js";

const router = Router();

router.post(
    "/register",
    createUser
);

router.get(
    "/",
    getUsers
);

router.post(
    "/login",
    loginUser
);

export default router;