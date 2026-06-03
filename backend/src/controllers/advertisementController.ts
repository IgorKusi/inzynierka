import { prisma } from "../config/prisma.js";
import { generateQRCode }
    from "../services/qrService.js";

export const createAdvertisement = async (req: any, res: any) => {
    try {

        const {
            brandName,
            logoPath,
            bannerPath,
            discountCode
        } = req.body;

        const advertisement = await prisma.advertisement.create({
            data: {
                brandName,
                logoPath,
                bannerPath,
                discountCode
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

export const getGameAdvertisement = async (
    req: any,
    res: any
) => {

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