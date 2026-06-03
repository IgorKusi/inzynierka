import type {Request, Response} from "express";

export const uploadImage = (
    req: Request,
    res: Response
) => {

    if (!req.file) {
        return res.status(400).json({
            error: "No file uploaded"
        });
    }

    res.json({
        filePath: `/uploads/${req.file.filename}`
    });
};