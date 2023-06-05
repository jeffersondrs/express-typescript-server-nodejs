"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var catchASync_js_1 = require("../utils/catchASync.js");
var prisma = new client_1.PrismaClient();
var index = catchASync_js_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, usersWithoutPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findMany({
                    include: {
                        links: true
                    }
                })];
            case 1:
                users = _a.sent();
                usersWithoutPassword = users.map(function (user) {
                    var password = user.password, userWithoutPassword = __rest(user, ["password"]);
                    return userWithoutPassword;
                });
                return [2 /*return*/, res.json(usersWithoutPassword)];
        }
    });
}); });
var create = catchASync_js_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, image, password, phone, profession, links, hashedPassword, existingUser, linkCreates, createdUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, image = _a.image, password = _a.password, phone = _a.phone, profession = _a.profession, links = _a.links;
                return [4 /*yield*/, bcrypt_1["default"].hash(password, 15)];
            case 1:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            email: email
                        }
                    })];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ error: "E-mail já cadastrado, tente outro!" })];
                }
                linkCreates = Array.isArray(links)
                    ? links.map(function (link) { return ({
                        title: link.title,
                        url: link.url
                    }); })
                    : [];
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            name: name,
                            email: email,
                            image: image,
                            password: hashedPassword,
                            phone: phone,
                            profession: profession,
                            links: {
                                create: linkCreates
                            }
                        }
                    })];
            case 3:
                createdUser = _b.sent();
                return [2 /*return*/, res.json(createdUser)];
        }
    });
}); });
var update = catchASync_js_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, email, image, password, phone, profession, redesLinks, hashedPassword, existingUser, linkCreates, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, email = _a.email, image = _a.image, password = _a.password, phone = _a.phone, profession = _a.profession, redesLinks = _a.redesLinks;
                return [4 /*yield*/, bcrypt_1["default"].hash(password, 15)];
            case 1:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            id: Number(id)
                        }
                    })];
            case 2:
                existingUser = _b.sent();
                if (!existingUser) {
                    return [2 /*return*/, res.status(404).json({ error: "Usuário não encontrado" })];
                }
                linkCreates = Array.isArray(redesLinks)
                    ? redesLinks.map(function (link) { return ({
                        title: link.title,
                        url: link.url
                    }); })
                    : [];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, prisma.user.update({
                        where: {
                            id: Number(id)
                        },
                        data: {
                            name: name,
                            email: email,
                            image: image,
                            password: hashedPassword,
                            phone: phone,
                            profession: profession,
                            links: {
                                create: linkCreates
                            }
                        },
                        include: {
                            links: true
                        }
                    })];
            case 4:
                user = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        phone: user.phone,
                        profession: user.profession,
                        links: user.links
                    })];
            case 5:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
            case 6: return [2 /*return*/];
        }
    });
}); });
var deleteUser = catchASync_js_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user["delete"]({
                        where: {
                            id: Number(id)
                        }
                    })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: "Usuário não encontrado" })];
                }
                return [2 /*return*/, res.json({ message: "Usuário excluído com sucesso" })];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
var show = catchASync_js_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, name, email, image, phone, profession, createdAt, updatedAt, links, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            id: Number(id)
                        },
                        include: {
                            links: true
                        }
                    })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: "Usuário não encontrado" })];
                }
                name = user.name, email = user.email, image = user.image, phone = user.phone, profession = user.profession, createdAt = user.createdAt, updatedAt = user.updatedAt, links = user.links;
                return [2 /*return*/, res.json({
                        id: id,
                        name: name,
                        email: email,
                        image: image,
                        phone: phone,
                        profession: profession,
                        createdAt: createdAt,
                        updatedAt: updatedAt,
                        links: links
                    })];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" + error_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); });
var login = catchASync_js_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, match, token, id, name, email_1, image, phone, profession;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            email: email
                        }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ error: "Usuário não encontrado" })];
                }
                return [4 /*yield*/, bcrypt_1["default"].compare(password, user.password)];
            case 2:
                match = _b.sent();
                if (!match) {
                    return [2 /*return*/, res.status(400).json({ error: "Senha incorreta" })];
                }
                try {
                    token = jsonwebtoken_1["default"].sign({ id: user.id }, process.env.JWT_SECRET, {
                        expiresIn: "1d"
                    });
                    id = user.id, name = user.name, email_1 = user.email, image = user.image, phone = user.phone, profession = user.profession;
                    return [2 /*return*/, res.json({
                            user: { id: id, name: name, email: email_1, image: image, phone: phone, profession: profession },
                            token: token
                        })];
                }
                catch (error) {
                    return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
                }
                return [2 /*return*/];
        }
    });
}); });
var search = catchASync_js_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, users, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.params.name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findMany({
                        where: {
                            name: {
                                contains: name
                            }
                        }
                    })];
            case 2:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
var searchEmail = catchASync_js_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, users, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.params.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findMany({
                        where: {
                            email: {
                                contains: email
                            }
                        }
                    })];
            case 2:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
var searchPhone = catchASync_js_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var phone, users, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phone = req.params.phone;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findMany({
                        where: {
                            phone: {
                                contains: phone
                            }
                        }
                    })];
            case 2:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
            case 3:
                error_6 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
var searchProfession = catchASync_js_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profession, users, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profession = req.params.profession;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findMany({
                        where: {
                            profession: {
                                contains: profession
                            }
                        }
                    })];
            case 2:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
            case 3:
                error_7 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports["default"] = {
    index: index,
    create: create,
    update: update,
    deleteUser: deleteUser,
    show: show,
    login: login,
    search: search,
    searchEmail: searchEmail,
    searchPhone: searchPhone,
    searchProfession: searchProfession
};
