import QRCode from "qrcode";

export const generateQRCode = async (
    advertisementId: number
) => {

    const gameUrl =
        `http://localhost:5173/play?ad=${advertisementId}`;

    const qrCodeDataUrl =
        await QRCode.toDataURL(gameUrl);

    return {
        gameUrl,
        qrCodeDataUrl
    };
};