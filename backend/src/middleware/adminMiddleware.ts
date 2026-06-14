export const adminOnly = (
    req: any,
    res: any,
    next: any
) => {

    if (
        req.user.role !== "ADMIN"
    ) {

        return res.status(403).json({

            error:
                "Admin only"
        });
    }

    next();
};