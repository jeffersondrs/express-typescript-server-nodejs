import express from "express";
import user from "../controllers/UserController.js";
import { authenticateToken } from "../controllers/Auth.js";
const router = express.Router();
router.get("/", (req, res) => {
    res.send("Hello World! This is the API for the React Native app.");
});
router.route("/users").get(authenticateToken, user.index).post(user.create);
router.put("/users/:id", authenticateToken, user.update);
router
    .route("/user/:id")
    .get(authenticateToken, user.show)
    .delete(authenticateToken, user.deleteUser);
router.post("/login", user.login);
export default router;
