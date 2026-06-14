import { prisma } from "../config/prisma.js";
import { generateQRCode } from "../services/qrService.js";

export const createAdvertisement = async (req: any, res: any) => {
    try {

        const {
            brandName,
            logoPath,
            bannerPath,
            discountCode
        } = req.body;

        const userId = req.user.userId;

        const advertisement =
            await prisma.advertisement.create({
                data: {
                    brandName,
                    logoPath,
                    bannerPath,
                    discountCode,
                    userId
                }
            });

        const qr =
            await generateQRCode(advertisement.id);

        const updatedAdvertisement =
            await prisma.advertisement.update({

                where: {
                    id: advertisement.id
                },

                data: {
                    qrCodeUrl: qr.gameUrl
                }
            });

        res.json({
            advertisement: updatedAdvertisement,
            qrCode: qr.qrCodeDataUrl
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Database error"
        });
    }
};

export const getAdvertisementById = async (req: any, res: any) => {
    try {

        const id = Number(req.params.id);

        const advertisement = await prisma.advertisement.findUnique({
            where: {
                id
            },

            include: {
                coupons: true
            }
        });

        if (!advertisement) {
            return res.status(404).json({
                error: "Advertisement not found"
            });
        }

        res.json(advertisement);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Database error"
        });
    }
};

export const getGameAdvertisement = async (req: any,res: any) => {

    try {

        const id = Number(req.params.id);

        const advertisement =
            await prisma.advertisement.findUnique({

                where: {
                    id
                }
            });

        if (!advertisement) {

            return res.status(404).json({
                error: "Advertisement not found"
            });
        }

        res.json({
            id: advertisement.id,
            brandName: advertisement.brandName,
            logoPath: advertisement.logoPath,
            bannerPath: advertisement.bannerPath
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Database error"
        });
    }
};
export const getAllAdvertisements = async (req: any,res: any) => {

    try {

        const advertisements =
            await prisma.advertisement.findMany({

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
export const deleteAdvertisement = async (req: any,res: any) => {

    try {

        const id = Number(req.params.id);

        const advertisement =
            await canAccessAdvertisement(id, req);

        if (advertisement === null) {

            return res.status(404).json({
                error:
                    "Advertisement not found"
            });
        }

        if (advertisement === false) {

            return res.status(403).json({
                error:
                    "Forbidden"
            });
        }

        await prisma.advertisement.delete({

            where: {
                id
            }
        });

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Database error"
        });
    }
};

export const getAdvertisementCoupons = async (req: any,res: any) => {

        try {

            const id = Number(req.params.id);

            const advertisement =
                await prisma.advertisement.findUnique({

                    where: {
                        id
                    },

                    include: {
                        coupons: true
                    }
                });

            if (!advertisement) {

                return res.status(404).json({
                    error:
                        "Advertisement not found"
                });
            }

            res.json(advertisement.coupons);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error:
                    "Database error"
            });
        }
    };
export const updateAdvertisement = async (req: any, res: any) => {

    try {

        const id =
            Number(req.params.id);

        const {
            brandName,
            logoPath,
            bannerPath,
            discountCode
        } = req.body;
        const advertisement =
            await canAccessAdvertisement(id, req);

        if (advertisement === null) {

            return res.status(404).json({
                error:
                    "Advertisement not found"
            });
        }

        if (advertisement === false) {

            return res.status(403).json({
                error:
                    "Forbidden"
            });
        }

        await prisma.advertisement.update({

                where: {
                    id
                },

                data: {
                    brandName,
                    logoPath,
                    bannerPath,
                    discountCode
                }
            });

        res.json(advertisement);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Database error"
        });
    }
};
export const getMyAdvertisements = async (req: any,res: any) => {

    try {

        const advertisements =
            await prisma.advertisement.findMany({

                where: {
                    userId:
                    req.user.userId
                },

                orderBy: {
                    id: "desc"
                }
            });

        res.json(advertisements);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error:
                "Database error"
        });
    }
};
async function canAccessAdvertisement(advertisementId: number, req: any) {

    const advertisement =
        await prisma.advertisement.findUnique({

            where: {
                id: advertisementId
            }
        });

    if (!advertisement) {
        return null;
    }

    if (req.user.role === "ADMIN") {
        return advertisement;
    }

    if (advertisement.userId !== req.user.userId) {
        return false;
    }

    return advertisement;
}
export const getAdvertisementStats = async (req: any, res: any) => {

        try {

            const id =
                Number(req.params.id);

            const advertisement = await canAccessAdvertisement(id, req);

            if (advertisement === null) {

                return res
                    .status(404)
                    .json({
                        error:
                            "Advertisement not found"
                    });
            }

            if (advertisement === false) {

                return res
                    .status(403)
                    .json({
                        error:
                            "Forbidden"
                    });
            }

            const totalCoupons =
                await prisma.coupon.count({

                    where: {
                        advertisementId:
                        id
                    }
                });

            const usedCoupons =
                await prisma.coupon.count({

                    where: {
                        advertisementId:
                        id,

                        isUsed: true
                    }
                });

            res.json({

                advertisementId:
                id,

                totalCoupons,

                usedCoupons,

                unusedCoupons:
                    totalCoupons -
                    usedCoupons
            });

        } catch (error) {

            console.error(
                error
            );

            res.status(500).json({

                error:
                    "Database error"
            });
        }
    };