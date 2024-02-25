import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const register = async (req, res) => {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user
        .create({
            data: {
                email,
                password: passwordHash,
            },
        })
        .then((user) => {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            res.json({ token });
        })
        .catch((error) => {
            res.status(400).json({ message: "User already exists" });
        });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
        return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });
    res.json({ token });
};

export { register, login }