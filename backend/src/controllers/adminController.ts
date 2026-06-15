import { prisma } from "../config/prisma.js";

export const getAdminStats = async (
    req: any,
    res: any
) => {

    try {

        const users =
            await prisma.user.count();

        const advertisers =
            await prisma.user.count({

                where: {
                    role: "ADVERTISER"
                }
            });

        const advertisements =
            await prisma.advertisement.count();

        const couponsGenerated =
            await prisma.coupon.count();

        const couponsUsed =
            await prisma.coupon.count({

                where: {
                    isUsed: true
                }
            });

        res.json({

            users,
            advertisers,
            advertisements,
            couponsGenerated,
            couponsUsed
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Database error"
        });
    }
};

export const getAllUsers = async (
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

export const getAdminAdvertisements =
    async (
        req: any,
        res: any
    ) => {

        try {

            const advertisements =
                await prisma.advertisement.findMany({

                    include: {
                        user: true,
                        coupons: true
                    },

                    orderBy: {
                        id: "desc"
                    }
                });

            res.json(advertisements);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: "Database error"
            });
        }
    };