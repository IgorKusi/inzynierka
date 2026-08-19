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

        const advertisementsData =
            await prisma.advertisement.findMany({
                select: {
                    launchCount: true
                }
            });

        const launches =
            advertisementsData.reduce(
                (sum, advertisement) =>
                    sum + advertisement.launchCount,
                0
            );

        res.json({
            users,
            advertisers,
            advertisements,
            launches,
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

                select: {
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true
                },

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

                        user: {
                            select: {
                                email: true
                            }
                        },

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


export const deleteAdminAdvertisement =
    async (
        req: any,
        res: any
    ) => {

        try {

            const id =
                Number(req.params.id);

            if (isNaN(id)) {

                return res.status(400).json({
                    error:
                        "Invalid advertisement ID"
                });
            }

            const advertisement =
                await prisma.advertisement.findUnique({
                    where: {
                        id
                    }
                });

            if (!advertisement) {

                return res.status(404).json({
                    error:
                        "Advertisement not found"
                });
            }

            await prisma.advertisement.delete({
                where: {
                    id
                }
            });

            res.json({
                message:
                    "Advertisement deleted"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error:
                    "Database error"
            });
        }
    };