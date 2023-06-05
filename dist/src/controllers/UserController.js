import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CatchAsync from "../utils/catchASync.js";
const prisma = new PrismaClient();
const index = CatchAsync(async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            links: true,
        },
    });
    const usersWithoutPassword = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
    return res.json(usersWithoutPassword);
});
const create = CatchAsync(async (req, res) => {
    const { name, email, image, password, phone, profession, links } = req.body;
    const hashedPassword = await bcrypt.hash(password, 15);
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (existingUser) {
        return res
            .status(400)
            .json({ error: "E-mail já cadastrado, tente outro!" });
    }
    const linkCreates = Array.isArray(links)
        ? links.map((link) => ({
            title: link.title,
            url: link.url,
        }))
        : [];
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            image,
            password: hashedPassword,
            phone,
            profession,
            links: {
                create: linkCreates,
            },
        },
    });
    return res.json(createdUser);
});
const update = CatchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, email, image, password, phone, profession, redesLinks } = req.body;
    const hashedPassword = await bcrypt.hash(password, 15);
    const existingUser = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const linkCreates = Array.isArray(redesLinks)
        ? redesLinks.map((link) => ({
            title: link.title,
            url: link.url,
        }))
        : [];
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                email,
                image,
                password: hashedPassword,
                phone,
                profession,
                links: {
                    create: linkCreates,
                },
            },
            include: {
                links: true,
            },
        });
        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            phone: user.phone,
            profession: user.profession,
            links: user.links,
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
const deleteUser = CatchAsync(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.json({ message: "Usuário excluído com sucesso" });
    }
    catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
const show = CatchAsync(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                links: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const { name, email, image, phone, profession, createdAt, updatedAt, links, } = user;
        return res.json({
            id,
            name,
            email,
            image,
            phone,
            profession,
            createdAt,
            updatedAt,
            links,
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" + error });
    }
});
const login = CatchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ error: "Senha incorreta" });
    }
    try {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        const { id, name, email, image, phone, profession } = user;
        return res.json({
            user: { id, name, email, image, phone, profession },
            token,
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
const search = CatchAsync(async (req, res) => {
    const { name } = req.params;
    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });
        return res.json(users);
    }
    catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
const searchEmail = CatchAsync(async (req, res) => {
    const { email } = req.params;
    try {
        const users = await prisma.user.findMany({
            where: {
                email: {
                    contains: email,
                },
            },
        });
        return res.json(users);
    }
    catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
const searchPhone = CatchAsync(async (req, res) => {
    const { phone } = req.params;
    try {
        const users = await prisma.user.findMany({
            where: {
                phone: {
                    contains: phone,
                },
            },
        });
        return res.json(users);
    }
    catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
const searchProfession = CatchAsync(async (req, res) => {
    const { profession } = req.params;
    try {
        const users = await prisma.user.findMany({
            where: {
                profession: {
                    contains: profession,
                },
            },
        });
        return res.json(users);
    }
    catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
export default {
    index,
    create,
    update,
    deleteUser,
    show,
    login,
    search,
    searchEmail,
    searchPhone,
    searchProfession,
};
