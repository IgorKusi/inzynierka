import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                error: "No token"
            });
        }
        const token = authHeader.replace("Bearer ","");

        const payload =
            jwt.verify(
                token,
                process.env.JWT_SECRET!
            );

        req.user = payload;

        next();

    } catch {

        return res.status(401).json({
            error: "Invalid token"
        });
    }
};