import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const createChampion = (req, res) => {
    const { name, type } = req.body;
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        try {
            const champion = await prisma.champion.create({
                data: {
                    name,
                    type,
                },
            });
            res.status(201).json(champion);
        } catch (error) {
            res.status(400).json(error);
        }
    });
};

const getChampions = async (req, res) => {
    try {
        const champions = await prisma.champion.findMany();
        res.status(200).json(champions);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getChampion = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const champion = await prisma.champion.findUnique({
            where: {
                id,
            },
        });
        res.status(200).json(champion);
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateChampion = (req, res) => {
    const id = Number(req.params.id);
    const { name, type } = req.body;
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        try {
            const champion = await prisma.champion.update({
                where: {
                    id,
                },
                data: {
                    name,
                    type,
                },
            });
            res.status(200).json(champion);
        } catch (error) {
            res.status(400).json(error);
        }
    });
};

const deleteChampion = (req, res) => {
    const id = Number(req.params.id);
    const token = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        prisma.champion
            .delete({
                where: {
                    id,
                },
            })
            .then((champion) => {
                res.status(200).json(champion);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    });
};

export {
    createChampion,
    getChampions,
    getChampion,
    updateChampion,
    deleteChampion,
};
