import QRCode from "qrcode";
import { FRONTEND_URL }
    from "../config.js";
export const generateQRCode = async (
    advertisementId: number
) => {

    const gameUrl =
        `${FRONTEND_URL}/play?ad=${advertisementId}`;

    const qrCodeDataUrl =
        await QRCode.toDataURL(gameUrl);

    return {
        gameUrl,
        qrCodeDataUrl
    };
};

export const generateCouponQR = async (
    couponCode: string
) => {

    return await QRCode.toBuffer(
        couponCode,
        {
            width: 512,
            margin: 2
        }
    );
};