"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var JWT_SECRET = process.env.JWT_SECRET;
var sign = function (payload) {
    return jsonwebtoken_1["default"].sign(payload, JWT_SECRET, { expiresIn: "1d" });
};
var verify = function (token) {
    return jsonwebtoken_1["default"].verify(token, JWT_SECRET);
};
exports["default"] = {
    sign: sign,
    verify: verify
};
