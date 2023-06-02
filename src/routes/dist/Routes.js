"use strict";
exports.__esModule = true;
var express_1 = require("express");
var UserController_js_1 = require("../controllers/UserController.js");
var Auth_js_1 = require("../controllers/Auth.js");
var router = express_1["default"].Router();
router.get("/", function (req, res) {
    res.send("Hello World! This is the API for the React Native app.");
});
router.route("/users").get(Auth_js_1.authenticateToken, UserController_js_1["default"].index).post(UserController_js_1["default"].create);
router.put("/users/:id", Auth_js_1.authenticateToken, UserController_js_1["default"].update);
router
    .route("/user/:id")
    .get(Auth_js_1.authenticateToken, UserController_js_1["default"].show)["delete"](Auth_js_1.authenticateToken, UserController_js_1["default"].deleteUser);
router.post("/login", UserController_js_1["default"].login);
exports["default"] = router;
