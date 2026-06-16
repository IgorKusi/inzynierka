export interface Advertisement {

    id: number;

    brandName: string;

    logoPath: string;

    bannerPath: string;

    qrCodeUrl: string | null;

    qrCode?: string;

    launchCount?: number;

    createdAt: string;

    user?: {
        email: string;
    } | null;

    coupons?: {
        id: number;
        isUsed: boolean;
    }[];
}