import type { Request, Response } from "express";

export const uploadVoucher = (
    req: Request,
    res: Response
) => {

    if (!req.file)
    {
        return res
            .status(400)
            .json({
                message: "Nie przesłano pliku."
            });
    }

    return res.json({
        fileName: req.file.filename
    });
};