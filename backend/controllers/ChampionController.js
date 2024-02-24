import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createChampion = async (req, res) => {
    const { name, type } = req.body;

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

const updateChampion = async (req, res) => {
    const id = Number(req.params.id);
    const { name, type } = req.body;

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
};

const deleteChampion = (req, res) => {
    const id = Number(req.params.id);

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
};

export {
    createChampion,
    getChampions,
    getChampion,
    updateChampion,
    deleteChampion,
};
