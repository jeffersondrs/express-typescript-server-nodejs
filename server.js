import { createServer } from "http";
import app from "./app.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const port = 3000;
const server = createServer(app);
server.listen(port, "127.0.0.1", () => {
    console.log(`Server listening on port ${port}`);
});
server.on("close", () => {
    prisma.$disconnect();
});
process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled Rejection! Shutting down...");
    server.close(() => {
        process.exit(1);
    });
});
