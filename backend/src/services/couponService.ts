import { prisma } from "../config/prisma.js";

function generateCode(): string {
    const chars =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 8; i++) {
        code += chars[
            Math.floor(
                Math.random() * chars.length
            )
            ];
    }

    return code;
}

export async function createCoupon(
    advertisementId: number
) {
    let code = generateCode();

    while (
        await prisma.coupon.findUnique({
            where: {
                code
            }
        })
        ) {
        code = generateCode();
    }

    const coupon =
        await prisma.coupon.create({
            data: {
                code,
                advertisementId
            }
        });

    return coupon;
}

export async function getCouponByCode(
    code: string
) {
    return await prisma.coupon.findUnique({
        where: {
            code
        }
    });
}

export async function redeemCoupon(
    code: string
) {
    const coupon =
        await prisma.coupon.findUnique({
            where: {
                code
            }
        });

    if (!coupon) {
        return null;
    }

    if (coupon.isUsed) {
        return false;
    }

    return await prisma.coupon.update({
        where: {
            code
        },
        data: {
            isUsed: true
        }
    });
}