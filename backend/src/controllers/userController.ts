import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";

export const createUser = async (
    req: any,
    res: any
) => {

    try {

        const {
            email,
            password,
            role
        } = req.body

        const passwordHash =
            await bcrypt.hash(
                password,
                10
            );

        const user =
            await prisma.user.create({

                data: {
                    email,
                    passwordHash,
                    role
                }
            });

        res.json(user);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Database error"
        });
    }
};

export const getUsers = async (
    req: any,
    res: any
) => {

    try {

        const users =
            await prisma.user.findMany({

                orderBy: {
                    id: "desc"
                }
            });

        res.json(users);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Database error"
        });
    }
};

export const loginUser = async (
    req: any,
    res: any
) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await prisma.user.findUnique({

                where: {
                    email
                }
            });

        if (!user) {

            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const validPassword =
            await bcrypt.compare(
                password,
                user.passwordHash
            );

        if (!validPassword) {

            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Login failed"
        });
    }
};