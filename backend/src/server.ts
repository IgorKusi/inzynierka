import "dotenv/config";

import express from "express";
import cors from "cors";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const app = express();
const adapter = new PrismaPg(process.env.DATABASE_URL!);

const prisma = new PrismaClient({
    adapter
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AdGame Backend Running");
});

app.get("/advertisements/:id", async (req, res) => {
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
});

app.post("/advertisements", async (req, res) => {
    try {

        const { brandName, logoPath, imagePath } = req.body;

        const advertisement = await prisma.advertisement.create({
            data: {
                brandName,
                logoPath,
                imagePath
            }
        });

        res.json(advertisement);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});