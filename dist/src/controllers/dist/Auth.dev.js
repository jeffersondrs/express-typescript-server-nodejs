"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var JWT_SECRET = process.env.JWT_SECRET;

var authenticateToken = function authenticateToken(req, res, next) {
  var authHeader = req.headers.authorization;
  var token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Token de autenticação não fornecido"
    });
  }

  _jsonwebtoken["default"].verify(token, JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(403).json({
        error: "Token de autenticação inválido"
      });
    }

    req.user = user;
    next();
  });
};

exports.authenticateToken = authenticateToken;