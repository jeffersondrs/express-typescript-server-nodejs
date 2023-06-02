"use strict";
exports.__esModule = true;
exports.authenticateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var JWT_SECRET = process.env.JWT_SECRET;
var authenticateToken = function (req, res, next) {
    var authHeader = req.headers.authorization;
    var token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ error: "Token de autenticação não fornecido" });
    }
    jsonwebtoken_1["default"].verify(token, JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(403).json({ error: "Token de autenticação inválido" });
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
