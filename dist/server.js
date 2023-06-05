"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_1 = require("http");
var app_js_1 = __importDefault(require("./app.js"));
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var port = 3000;
var server = http_1.createServer(app_js_1["default"]);
server.listen(port, "127.0.0.1", function () {
    console.log("Server listening on port " + port);
});
server.on("close", function () {
    prisma.$disconnect();
});
process.on("unhandledRejection", function (err) {
    console.log(err.name, err.message);
    console.log("Unhandled Rejection! Shutting down...");
    server.close(function () {
        process.exit(1);
    });
});
